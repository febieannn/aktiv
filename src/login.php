<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}


/*
|--------------------------------------------------------------------------
| DATABASE
|--------------------------------------------------------------------------
*/

$host = "localhost";
$user = "root";
$pass = "";
$dbname = "aktiv";

$conn = new mysqli(
    $host,
    $user,
    $pass,
    $dbname
);


/*
|--------------------------------------------------------------------------
| CHECK DATABASE CONNECTION
|--------------------------------------------------------------------------
*/

if ($conn->connect_error) {

    echo json_encode([
        "success" => false,
        "message" => "Database connection failed: " . $conn->connect_error
    ]);

    exit();
}


/*
|--------------------------------------------------------------------------
| GET JSON FROM REACT
|--------------------------------------------------------------------------
*/

$input = file_get_contents("php://input");

$data = json_decode($input, true);


/*
|--------------------------------------------------------------------------
| CHECK JSON
|--------------------------------------------------------------------------
*/

if (!is_array($data)) {

    echo json_encode([
        "success" => false,
        "message" => "Invalid request data."
    ]);

    $conn->close();

    exit();
}


/*
|--------------------------------------------------------------------------
| GET EMAIL AND PASSWORD
|--------------------------------------------------------------------------
*/

$email = trim($data["email"] ?? "");
$password = $data["password"] ?? "";


/*
|--------------------------------------------------------------------------
| CHECK EMPTY FIELDS
|--------------------------------------------------------------------------
*/

if ($email === "" || $password === "") {

    echo json_encode([
        "success" => false,
        "message" => "Please enter your email and password."
    ]);

    $conn->close();

    exit();
}


/*
|--------------------------------------------------------------------------
| FIND USER
|--------------------------------------------------------------------------
*/

$stmt = $conn->prepare(
    "SELECT FullName, Email, Password
     FROM login
     WHERE Email = ?
     LIMIT 1"
);


/*
|--------------------------------------------------------------------------
| CHECK QUERY
|--------------------------------------------------------------------------
*/

if (!$stmt) {

    echo json_encode([
        "success" => false,
        "message" => "Database query failed."
    ]);

    $conn->close();

    exit();
}


/*
|--------------------------------------------------------------------------
| EXECUTE QUERY
|--------------------------------------------------------------------------
*/

$stmt->bind_param("s", $email);

$stmt->execute();

$result = $stmt->get_result();


/*
|--------------------------------------------------------------------------
| CHECK USER
|--------------------------------------------------------------------------
*/

if ($row = $result->fetch_assoc()) {

    /*
    |--------------------------------------------------------------------------
    | CHECK PASSWORD
    |--------------------------------------------------------------------------
    |
    | This matches your current database setup where the password
    | is stored as plain text.
    |
    */

    if ($password === $row["Password"]) {

        echo json_encode([
            "success" => true,
            "message" => "Login successful.",
            "fullname" => $row["FullName"],
            "email" => $row["Email"]
        ]);

    } else {

        echo json_encode([
            "success" => false,
            "message" => "Password is wrong."
        ]);
    }

} else {

    echo json_encode([
        "success" => false,
        "message" => "Email not found."
    ]);
}


/*
|--------------------------------------------------------------------------
| CLOSE
|--------------------------------------------------------------------------
*/

$stmt->close();

$conn->close();

?>