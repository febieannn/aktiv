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
      description:
        'Create a navigation bar that adapts to different screen sizes.',
      action: 'soon',
      blue: true
    }
  ]

  function openLogin() {
    setAuthMode('login')
    setPage('auth')
    window.scrollTo(0, 0)
  }

  function openSignup() {
    setAuthMode('signup')
    setPage('auth')
    window.scrollTo(0, 0)
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

  function goHome() {
    setPage('home')
    window.scrollTo(0, 0)
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

    window.scrollTo(0, 0)
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

    window.scrollTo(0, 0)
  }

  function scrollToSection(id) {
    if (page !== 'home') {
      setPage('home')

      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: 'smooth'
        })
      }, 100)
    } else {
      document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }

  return (
    <main className="page">
      <section className="website">

        {/* ================= NAVBAR ================= */}
        <nav className="navbar">

          <button
            className="small-logo logo-button"
            onClick={goHome}
          >
            <span className="small-icon">a</span>ktiv
          </button>

          {page === 'home' && (
            <div className="nav-links">

              <button onClick={goHome}>
                Home
              </button>

              <button onClick={() => scrollToSection('features')}>
                Features
              </button>

              <button onClick={() => scrollToSection('how-it-works')}>
                How It Works
              </button>

              <button onClick={() => scrollToSection('about')}>
                About
              </button>

              <button
                className="nav-login"
                onClick={openLogin}
              >
                Login
              </button>

              <button
                className="nav-signup"
                onClick={openSignup}
              >
                Sign Up
              </button>

            </div>
          )}

          {page !== 'home' && (
            <div className="nav-links">

              <button onClick={goHome}>
                Home
              </button>

              <button onClick={() => scrollToSection('features')}>
                Features
              </button>

              <button onClick={openSignup}>
                Profile
              </button>

              <button
                onClick={() => alert('Settings coming soon!')}
              >
                Settings
              </button>

            </div>
          )}

        </nav>


        {/* =====================================================
            PAGE 1 — LANDING PAGE
        ===================================================== */}
        {page === 'home' && (
          <>

            {/* ================= HERO ================= */}
            <section className="hero-section">

              <div className="hero-content">

                <div className="hero-text">

                  <h1>
                    Practice Coding.
                    <br />
                    Build your skills.
                  </h1>

                  <p>
                    Learn through challenges, get instant feedback,
                    and improve your programming skills with Aktiv —
                    built for students who want to practice, learn,
                    and grow.
                  </p>

                  <div className="hero-buttons">

                    <button
                      className="start-btn"
                      onClick={() => setPage('activities')}
                    >
                      Start Practicing
                    </button>

                    <button
                      className="explore-btn"
                      onClick={() => scrollToSection('features')}
                    >
                      Explore Features
                    </button>

                  </div>

                </div>


                <div className="hero-preview">

                  <img
                    src="/aktivLogo.png"
                    alt="Aktiv Logo"
                    className="hero-logo"
                  />

                </div>

              </div>

            </section>


            {/* ================= FEATURES ================= */}
            <section
              className="features-section"
              id="features"
            >

              <div className="section-title">
                <h2>Features</h2>
              </div>

              <div className="features-grid">

                <div className="feature-card">
                  <div className="feature-icon">▣</div>
                  <h3>Interactive Practice</h3>
                  <p>
                    Practice coding through simple
                    hands-on activities.
                  </p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">▤</div>
                  <h3>Beginner-Friendly Challenges</h3>
                  <p>
                    Start with easy challenges and
                    improve step by step.
                  </p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">▰</div>
                  <h3>Instant Feedback</h3>
                  <p>
                    Get feedback while practicing
                    your coding skills.
                  </p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">▱</div>
                  <h3>Progress Tracking</h3>
                  <p>
                    Keep track of your practice and
                    improve over time.
                  </p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">◆</div>
                  <h3>Points &amp; Rewards</h3>
                  <p>
                    Complete activities and earn
                    points as you learn.
                  </p>
                </div>

              </div>

            </section>


            {/* ================= HOW IT WORKS ================= */}
            <section
              className="how-section"
              id="how-it-works"
            >

              <div className="section-title">
                <h2>How It Works</h2>
              </div>

              <div className="steps-container">

                <div className="step">
                  <div className="step-number">1</div>
                  <h3>Create an account</h3>
                </div>

                <div className="step">
                  <div className="step-number">2</div>
                  <h3>Choose an activity</h3>
                </div>

                <div className="step">
                  <div className="step-number">3</div>
                  <h3>Start a challenge</h3>
                </div>

                <div className="step">
                  <div className="step-number">4</div>
                  <h3>Practice your skills</h3>
                </div>

                <div className="step">
                  <div className="step-number">5</div>
                  <h3>Receive feedback</h3>
                </div>

                <div className="step">
                  <div className="step-number">6</div>
                  <h3>Improve your skills</h3>
                </div>

              </div>

            </section>


            {/* ================= ABOUT ================= */}
            <section
              className="about-section"
              id="about"
            >

              <div className="about-title">
                <h2>Why aktiv?</h2>
              </div>

              <div className="about-text">
                <p>
                  Programming is a skill developed through practice.
                  Aktiv gives students a simple way to learn coding
                  through challenges, instant feedback, and activities
                  designed to help them build confidence and improve
                  their skills.
                </p>
              </div>

            </section>


            {/* ================= CTA ================= */}
            <section className="cta-section">

              <h2>Ready to improve your skills?</h2>

              <button
                className="cta-button"
                onClick={() => setPage('activities')}
              >
                Start Practicing
              </button>

            </section>


            {/* ================= FOOTER ================= */}
            <footer className="footer">

              <div className="footer-logo">
                <span className="small-icon">a</span>ktiv
              </div>

              <div className="footer-links">

                <button onClick={() => scrollToSection('about')}>
                  About
                </button>

                <button onClick={() => scrollToSection('features')}>
                  Features
                </button>

                <button onClick={openLogin}>
                  Contact
                </button>

                <button onClick={() => scrollToSection('how-it-works')}>
                  Privacy Policy
                </button>

                <button onClick={goHome}>
                  Terms
                </button>

              </div>

            </footer>

          </>
        )}


        {/* =====================================================
            PAGE 2 — AVAILABLE ACTIVITIES
        ===================================================== */}
        {page === 'activities' && (
          <section className="activities-page">

            <div className="activities-header">
              <h1>AVAILABLE ACTIVITIES</h1>

              <p>
                Choose a coding activity and start practicing.
              </p>
            </div>

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
                    onClick={() =>
                      startActivity(activity.action)
                    }
                  >
                    Start activity →
                  </button>

                </div>
              ))}

            </div>

          </section>
        )}


        {/* PAGE 3 & 4 — LOGIN / SIGN UP */}
        {page === 'auth' && (
          <section className="form-page">

            {/* LOGIN */}
            {authMode === 'login' && (
              <form
                className="auth-card login-card"
                onSubmit={handleLogin}
              >

                <div className="auth-header">
                  <h1>Welcome Back</h1>
                  <p>Login to continue practicing.</p>
                </div>

                <div className="auth-tabs">

                  <button
                    type="button"
                    className="auth-tab"
                    onClick={() => setAuthMode('signup')}
                  >
                    Sign Up
                  </button>

                  <button
                    type="button"
                    className="auth-tab active-tab"
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
                      onChange={(e) =>
                        setLoginEmail(e.target.value)
                      }
                    />

                  </div>

                  <div className="input-box">

                    <span className="input-icon">♙</span>

                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
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
                    onClick={() =>
                      alert(
                        'Forgot Password feature coming soon!'
                      )
                    }
                  >
                    Forgot Password?
                  </button>

                </div>

              </form>
            )}


            {/* SIGN UP */}
            {authMode === 'signup' && (
              <form
                className="auth-card signup-card"
                onSubmit={handleSignup}
              >

                <div className="auth-header">
                  <h1>Create an Account</h1>
                  <p>Join Aktiv and start practicing.</p>
                </div>

                <div className="auth-tabs">

                  <button
                    type="button"
                    className="auth-tab active-tab"
                  >
                    Sign Up
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
                      onChange={(e) =>
                        setUsername(e.target.value)
                      }
                    />

                  </div>

                  <div className="input-box">

                    <span className="input-icon">✉</span>

                    <input
                      type="email"
                      placeholder="Email"
                      value={signupEmail}
                      onChange={(e) =>
                        setSignupEmail(e.target.value)
                      }
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