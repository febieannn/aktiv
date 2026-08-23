import { useState } from 'react'
import './App.css'

function App() {
  const [page, setPage] = useState('home')
  const [authMode, setAuthMode] = useState('login')

  const [username, setUsername] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [password, setPassword] = useState('')

  const activities = [
    {
      title: 'Login Form',
      description: 'Create a form for users to enter their account details.',
      action: 'login'
    },
    {
      title: 'Registration Form',
      description: 'Create a form for users to register an account.',
      action: 'signup'
    },
    {
      title: 'Add to Cart Card',
      description: 'Create a product card with an Add to Cart button.',
      action: 'soon'
    },
    {
      title: 'Responsive Navbar',
      description: 'Create a navigation bar that adapts to different screen sizes.',
      action: 'soon',
      blue: true
    }
  ]

  function openLogin() {
    setAuthMode('login')
    setPage('auth')
  }

  function openSignup() {
    setAuthMode('signup')
    setPage('auth')
  }

  function startActivity(action) {
    if (action === 'login') {
      openLogin()
    } else if (action === 'signup') {
      openSignup()
    } else {
      alert('This activity will be available soon!')
    }
  }

  function handleLogin(e) {
    e.preventDefault()

    if (!loginEmail || !password) {
      alert('Please fill in your email and password.')
      return
    }

    alert('Login successful!')
    setLoginEmail('')
    setPassword('')
    setPage('activities')
  }

  function handleSignup(e) {
    e.preventDefault()

    if (!username || !signupEmail) {
      alert('Please fill in your username and email.')
      return
    }

    alert('Sign up successful!')
    setUsername('')
    setSignupEmail('')
    setPage('activities')
  }

  return (
    <main className="page">
      <section className="website">

        {/* ================= NAVBAR ================= */}
        <nav className="navbar">
          <button
            className="small-logo logo-button"
            onClick={() => setPage('home')}
          >
            <span className="small-icon">a</span>ktiv
          </button>

          {/* LANDING PAGE NAVIGATION */}
          {page === 'home' && (
            <div className="nav-links">
              <button onClick={() => alert('About Aktiv')}>
                About
              </button>

              <button onClick={openSignup}>
                Sign In
              </button>

              <button onClick={openLogin}>
                Login
              </button>
            </div>
          )}

          {/* OTHER PAGE NAVIGATION */}
          {page !== 'home' && (
            <div className="nav-links">
              <button onClick={() => setPage('home')}>
                Home
              </button>

              <button onClick={openSignup}>
                Profile
              </button>

              <button onClick={() => alert('Settings coming soon!')}>
                Settings
              </button>
            </div>
          )}
        </nav>

        {/* =====================================================
            PAGE 1 — LANDING PAGE
        ===================================================== */}
        {page === 'home' && (
          <section className="hero-section">

            <div className="main-logo">
              <img
                src="/aktivLogo.png"
                alt="Aktiv Logo"
                className="aktiv-logo"
              />
            </div>

            <div className="tagline">
              A simple way to enhance your coding skills
            </div>

            <h1>Practice your knowledge.</h1>

            <button
              className="start-btn"
              onClick={() => setPage('activities')}
            >
              Start challenge
            </button>

          </section>
        )}

        {/* =====================================================
            PAGE 2 — AVAILABLE ACTIVITIES
        ===================================================== */}
        {page === 'activities' && (
          <section className="activities-page">

            <h1>AVAILABLE ACTIVITIES</h1>

            <div className="activities-grid">
              {activities.map((activity) => (
                <div
                  key={activity.title}
                  className={`activity-card ${
                    activity.blue ? 'blue-card' : ''
                  }`}
                >
                  <h2>{activity.title}</h2>

                  <p>{activity.description}</p>

                  <button
                    className="activity-btn"
                    onClick={() => startActivity(activity.action)}
                  >
                    Start activity →
                  </button>
                </div>
              ))}
            </div>

          </section>
        )}

        {/* =====================================================
            PAGE 3 — LOGIN
            PAGE 4 — SIGN UP
        ===================================================== */}
        {page === 'auth' && (
          <section className="form-page">

            {/* ================= LOGIN ================= */}
            {authMode === 'login' && (
              <form
                className="auth-card login-card"
                onSubmit={handleLogin}
              >
                <div className="auth-tabs">

                  <button
                    type="button"
                    className="auth-tab"
                    onClick={() => setAuthMode('signup')}
                  >
                    Sign In
                  </button>

                  <button
                    type="button"
                    className="auth-tab active-tab"
                    onClick={() => setAuthMode('login')}
                  >
                    Login
                  </button>

                </div>

                <div className="form-fields">

                  <div className="input-box">
                    <span className="input-icon">✉</span>

                    <input
                      type="email"
                      placeholder="Email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>

                  <div className="input-box">
                    <span className="input-icon">♙</span>

                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="continue-btn"
                  >
                    Login
                  </button>

                  <button
                    type="button"
                    className="form-link"
                    onClick={() => alert('Forgot Password feature coming soon!')}
                  >
                    Forgot Password?
                  </button>

                </div>
              </form>
            )}

            {/* ================= SIGN UP ================= */}
            {authMode === 'signup' && (
              <form
                className="auth-card signup-card"
                onSubmit={handleSignup}
              >
                <div className="auth-tabs">

                  <button
                    type="button"
                    className="auth-tab active-tab"
                    onClick={() => setAuthMode('signup')}
                  >
                    Sign In
                  </button>

                  <button
                    type="button"
                    className="auth-tab"
                    onClick={() => setAuthMode('login')}
                  >
                    Login
                  </button>

                </div>

                <div className="form-fields">

                  <div className="input-box">
                    <span className="input-icon">♙</span>

                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div className="input-box">
                    <span className="input-icon">✉</span>

                    <input
                      type="email"
                      placeholder="Email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="continue-btn"
                  >
                    Continue
                  </button>

                  <button
                    type="button"
                    className="form-link"
                    onClick={() => setAuthMode('login')}
                  >
                    Already have an account?
                  </button>

                </div>
              </form>
            )}

          </section>
        )}

      </section>
    </main>
  )
}

export default App