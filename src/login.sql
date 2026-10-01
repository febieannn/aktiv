-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 29, 2026 at 09:27 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aktiv`
--

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `FullName` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `ConfirmPassword` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`FullName`, `Email`, `Password`, `ConfirmPassword`) VALUES
('Casey Marie Lois Barrido', 'caseylois@gmail.com', 'Cslsya05', 'Cslsya05'),
('Allyn Joy Fullo', 'allyn@gmail.com', 'Ashcgxhg', 'Ashcgxhg'),
('Chanelle Anika Garcia', 'Tyanil@gmail.com', 'cHgafsf2', 'cHgafsf2'),
('Niña Amistoso', 'ninya@gmail.com', 'Nahsfg20', 'Nahsfg20'),
('Jeny An Telesforo', 'jenyan@gmail.com', 'jNhdfghy', 'jNhdfghy'),
('Angela Alfaro', 'gelaa@gmail.com', 'Ghsxjsf2', 'Ghsxjsf2'),
('Febie Ann Mombay', 'febieann@gmail.com', 'Amixfshh', 'Amixfshh');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
