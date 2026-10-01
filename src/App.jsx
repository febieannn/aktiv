import { useState } from 'react'
import './App.css'

function App() {
  const [page, setPage] = useState('home')
  const [authMode, setAuthMode] = useState('login')

  // SIGN UP
  const [fullName, setFullName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // LOGIN
  const [loginEmail, setLoginEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  // NAVIGATION
  const [activeNav, setActiveNav] = useState('home')
  const [showUserMenu, setShowUserMenu] = useState(false)

  // LOGIN STATUS
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loggedInUsername, setLoggedInUsername] = useState('')

  // SETTINGS
  const [settingsTab, setSettingsTab] = useState('account')

  const [notifications, setNotifications] = useState({
    activityReminders: true,
    progressUpdates: true,
    newActivities: true,
    emailNotifications: true
  })

  // ACTIVITIES
  const activities = [
    {
      title: 'Login Form',
      description:
        'Create a form for users to enter their account details.',
      action: 'login',
      status: 'Completed',
      type: 'completed',
      icon: 'login'
    },
    {
      title: 'Registrations Form',
      description:
        'Create a form for users to register an account.',
      action: 'signup',
      status: 'Not Started',
      type: 'not-started',
      icon: 'registration'
    },
    {
      title: 'Add to Cart Card',
      description:
        'Create a product card with an Add to Cart button.',
      action: 'soon',
      status: 'Not Started',
      type: 'not-started',
      icon: 'cart'
    },
    {
      title: 'Responsive Navbar',
      description:
        'Create a navigation bar that adapts to different screen sizes.',
      action: 'soon',
      status: 'In Progress',
      type: 'in-progress',
      icon: 'responsive'
    },
    {
      title: 'Pricing Tier Card',
      description:
        'Build a pricing plan card featuring highlight features and button features.',
      action: 'soon',
      status: 'Not Started',
      type: 'not-started',
      icon: 'pricing'
    },
    {
      title: 'Profile Card Component',
      description:
        'Design a user product card with avatar styling and social media links.',
      action: 'soon',
      status: 'Not Started',
      type: 'not-started',
      icon: 'profile'
    }
  ]

  // ==================================================
  // NAVIGATION FUNCTIONS
  // ==================================================

  function goHome() {
    setPage('home')
    setActiveNav('home')
    setShowUserMenu(false)

    window.scrollTo(0, 0)
  }

  function goActivities() {
    if (!isLoggedIn) {
      openLogin()
      return
    }

    setPage('activities')
    setActiveNav('activities')
    setShowUserMenu(false)

    window.scrollTo(0, 0)
  }

  function openLogin() {
    setAuthMode('login')
    setLoginError('')
    setPage('auth')
    setActiveNav('')
    setShowUserMenu(false)

    window.scrollTo(0, 0)
  }

  function openSignup() {
    setAuthMode('signup')
    setLoginError('')
    setPage('auth')
    setActiveNav('')
    setShowUserMenu(false)

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

  // ==================================================
  // SCROLL TO HOME SECTIONS
  // ==================================================

  function scrollToSection(id) {
    setShowUserMenu(false)

    if (page !== 'home') {
      setPage('home')

      if (id === 'features') {
        setActiveNav('features')
      } else if (id === 'how-it-works') {
        setActiveNav('how')
      } else if (id === 'about') {
        setActiveNav('about')
      } else {
        setActiveNav('home')
      }

      setTimeout(() => {
        document
          .getElementById(id)
          ?.scrollIntoView({
            behavior: 'smooth'
          })
      }, 100)

      return
    }

    if (id === 'features') {
      setActiveNav('features')
    } else if (id === 'how-it-works') {
      setActiveNav('how')
    } else if (id === 'about') {
      setActiveNav('about')
    } else {
      setActiveNav('home')
    }

    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: 'smooth'
      })
  }

  function goProgress() {
    if (!isLoggedIn) {
      openLogin()
      return
    }

    setShowUserMenu(false)
    setActiveNav('progress')

    alert('Progress coming soon!')
  }

  function goSettings(tab = 'account') {
    if (!isLoggedIn) {
      openLogin()
      return
    }

    setSettingsTab(tab)
    setPage('settings')
    setActiveNav('')
    setShowUserMenu(false)

    window.scrollTo(0, 0)
  }

  function handleLogout() {
    setIsLoggedIn(false)
    setLoggedInUsername('')
    setShowUserMenu(false)

    setPage('home')
    setActiveNav('home')

    window.scrollTo(0, 0)

    alert('You have been logged out.')
  }

  // ==================================================
  // LOGIN
  // ==================================================

  async function handleLogin(e) {
    e.preventDefault()

    setLoginError('')

    if (!loginEmail || !password) {
      setLoginError(
        'Please enter your email and password.'
      )

      return
    }

    try {
      const response = await fetch(
        'http://localhost/aktiv/login.php',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/x-www-form-urlencoded'
          },

          body: new URLSearchParams({
            email: loginEmail,
            password: password
          })
        }
      )

      /*
       * Your PHP login currently uses a redirect.
       * If it redirects to page1.php,
       * login is considered successful.
       */

      if (response.url.includes('page1.php')) {
        setIsLoggedIn(true)

        /*
         * Since there is no username field in Sign Up,
         * use the email before @ as the display name.
         */

        setLoggedInUsername(
          loginEmail.split('@')[0]
        )

        setLoginEmail('')
        setPassword('')
        setLoginError('')

        setPage('activities')
        setActiveNav('activities')

        window.scrollTo(0, 0)
      } else {
        setLoginError(
          'Invalid email or password.'
        )
      }
    } catch (error) {
      console.error(error)

      setLoginError(
        'Cannot connect to PHP. Make sure XAMPP Apache is running.'
      )
    }
  }

  // ==================================================
  // SIGN UP
  // ==================================================

  async function handleSignup(e) {
    e.preventDefault()

    /*
     * USERNAME REMOVED
     *
     * Required fields:
     * Full Name
     * Email
     * Password
     * Confirm Password
     */

    if (
      !fullName ||
      !signupEmail ||
      !signupPassword ||
      !confirmPassword
    ) {
      alert('Please complete all fields.')

      return
    }

    if (signupPassword !== confirmPassword) {
      alert('Passwords do not match.')

      return
    }

    try {
      const response = await fetch(
        'http://localhost/aktiv/signup.php',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          /*
           * USERNAME REMOVED FROM REQUEST
           */

          body: JSON.stringify({
            fullname: fullName,
            email: signupEmail,
            password: signupPassword,
            confirmPassword: confirmPassword
          })
        }
      )

      const data = await response.json()

      if (data.success) {
        alert('Sign up successful!')

        setFullName('')
        setSignupEmail('')
        setSignupPassword('')
        setConfirmPassword('')

        setAuthMode('login')
      } else {
        alert(
          data.message || 'Sign up failed.'
        )
      }
    } catch (error) {
      console.error(error)

      alert(
        'Cannot connect to PHP. Make sure XAMPP Apache is running.'
      )
    }
  }

  // ==================================================
  // NOTIFICATIONS
  // ==================================================

  function toggleNotification(key) {
    setNotifications((previous) => ({
      ...previous,
      [key]: !previous[key]
    }))
  }

  // ==================================================
  // ACTIVITY ICONS
  // ==================================================

  function renderActivityIcon(type) {
    if (type === 'login') {
      return (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect
            x="5"
            y="3"
            width="14"
            height="18"
            rx="2"
          />
          <path d="M9 8h6" />
          <path d="M9 12h6" />
          <path d="M9 16h4" />
        </svg>
      )
    }

    if (type === 'registration') {
      return (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect
            x="4"
            y="3"
            width="13"
            height="18"
            rx="2"
          />

          <path d="M8 7h5" />
          <path d="M8 11h5" />
          <path d="M8 15h3" />
          <path d="m17 15 4-4" />
          <path d="m18 14 2 2" />
        </svg>
      )
    }

    if (type === 'cart') {
      return (
        <svg
          width="23"
          height="23"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H7" />

          <circle
            cx="10"
            cy="19"
            r="1"
          />

          <circle
            cx="18"
            cy="19"
            r="1"
          />
        </svg>
      )
    }

    if (type === 'responsive') {
      return (
        <svg
          width="23"
          height="23"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect
            x="3"
            y="5"
            width="12"
            height="14"
            rx="2"
          />

          <rect
            x="17"
            y="9"
            width="4"
            height="8"
            rx="1"
          />

          <path d="M7 9h4" />
          <path d="M7 13h4" />
        </svg>
      )
    }

    if (type === 'pricing') {
      return (
        <svg
          width="23"
          height="23"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m20 13-7 7-8-8V5h7z" />

          <circle
            cx="8"
            cy="8"
            r="1"
          />
        </svg>
      )
    }

    return (
      <svg
        width="23"
        height="23"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle
          cx="12"
          cy="8"
          r="3"
        />

        <path d="M5 20c.7-3.6 3-5.5 7-5.5s6.3 1.9 7 5.5" />
      </svg>
    )
  }

  return (
    <main className="page">

      <section className="website">

        {/* ==================================================
            NAVBAR
            ================================================== */}

        <nav className="navbar">

          {/* LOGO */}

          <button
            type="button"
            className="logo-button"
            onClick={goHome}
            aria-label="Go home"
          >
            <img
              src="/aktivLogo.png"
              alt="aktiv"
              className="aktiv-logo"
            />
          </button>


          {/* ==================================================
              CENTER NAVIGATION
              ================================================== */}

          <div className="nav-center">

            {/* HOME */}

            <button
              type="button"
              className={
                activeNav === 'home'
                  ? 'nav-item active'
                  : 'nav-item'
              }
              onClick={goHome}
            >
              Home
            </button>


            {/* FEATURES */}

            <button
              type="button"
              className={
                activeNav === 'features'
                  ? 'nav-item active'
                  : 'nav-item'
              }
              onClick={() =>
                scrollToSection('features')
              }
            >
              Features
            </button>


            {/* ONLY SHOW AFTER LOGIN */}

            {isLoggedIn && (
              <>
                <button
                  type="button"
                  className={
                    activeNav === 'activities'
                      ? 'nav-item active'
                      : 'nav-item'
                  }
                  onClick={goActivities}
                >
                  Activities
                </button>

                <button
                  type="button"
                  className={
                    activeNav === 'progress'
                      ? 'nav-item active'
                      : 'nav-item'
                  }
                  onClick={goProgress}
                >
                  Progress
                </button>
              </>
            )}


            {/* HOW IT WORKS */}

            <button
              type="button"
              className={
                activeNav === 'how'
                  ? 'nav-item active'
                  : 'nav-item'
              }
              onClick={() =>
                scrollToSection('how-it-works')
              }
            >
              How it works
            </button>


            {/* ABOUT */}

            <button
              type="button"
              className={
                activeNav === 'about'
                  ? 'nav-item active'
                  : 'nav-item'
              }
              onClick={() =>
                scrollToSection('about')
              }
            >
              About
            </button>

          </div>


          {/* ==================================================
              RIGHT NAVIGATION
              ================================================== */}

          <div className="nav-user">

            {!isLoggedIn ? (

              <>
                <button
                  type="button"
                  className="nav-login-button"
                  onClick={openLogin}
                >
                  Login
                </button>

                <button
                  type="button"
                  className="nav-signup-button"
                  onClick={openSignup}
                >
                  Sign Up
                </button>
              </>

            ) : (

              <>

                {/* NOTIFICATION */}

                <button
                  type="button"
                  className="nav-icon-button"
                  onClick={() =>
                    goSettings('notification')
                  }
                  aria-label="Notifications"
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                    <path d="M10 21h4" />
                  </svg>
                </button>


                {/* USER PROFILE */}

                <button
                  type="button"
                  className="nav-user-profile"
                  onClick={() =>
                    goSettings('account')
                  }
                  aria-label="Profile"
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle
                      cx="12"
                      cy="8"
                      r="3.2"
                    />

                    <path d="M5.5 20c.8-3.4 3-5 6.5-5s5.7 1.6 6.5 5" />
                  </svg>
                </button>


                {/* DISPLAY NAME */}

                <button
                  type="button"
                  className="nav-username-button"
                  onClick={() =>
                    goSettings('account')
                  }
                >
                  {loggedInUsername || 'Account'}
                </button>


                {/* CHEVRON */}

                <button
                  type="button"
                  className="nav-chevron"
                  onClick={() =>
                    setShowUserMenu(
                      previous => !previous
                    )
                  }
                  aria-label="Account menu"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>


                {/* USER DROPDOWN */}

                {showUserMenu && (
                  <div className="user-menu">

                    <button
                      type="button"
                      onClick={() =>
                        goSettings('account')
                      }
                    >
                      Settings
                    </button>

                    <button
                      type="button"
                      onClick={handleLogout}
                    >
                      Log out
                    </button>

                  </div>
                )}

              </>

            )}

          </div>

        </nav>


        {/* ==================================================
            HOME
            ================================================== */}

        {page === 'home' && (
          <>

            {/* HERO */}

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
                      onClick={goActivities}
                    >
                      Start Practicing
                    </button>

                    <button
                      className="explore-btn"
                      onClick={() =>
                        scrollToSection('features')
                      }
                    >
                      Explore Features
                    </button>

                  </div>

                </div>


                <div className="hero-preview">

                  <div className="hero-aktiv-logo">
                    aktiv
                  </div>

                </div>

              </div>

            </section>


            {/* ==================================================
                FEATURES
                ================================================== */}

            <section
              className="features-section"
              id="features"
            >

              <div className="section-title">

                <h2>
                  Features
                </h2>

              </div>


              <div className="features-grid">

                <div className="feature-card">

                  <div className="feature-icon">
                    ▣
                  </div>

                  <h3>
                    Interactive Practice
                  </h3>

                  <p>
                    Practice coding through simple
                    hands-on activities.
                  </p>

                </div>


                <div className="feature-card">

                  <div className="feature-icon">
                    ▤
                  </div>

                  <h3>
                    Beginner-Friendly Challenges
                  </h3>

                  <p>
                    Start with easy challenges and
                    improve step by step.
                  </p>

                </div>


                <div className="feature-card">

                  <div className="feature-icon">
                    ▰
                  </div>

                  <h3>
                    Instant Feedback
                  </h3>

                  <p>
                    Get feedback while practicing
                    your coding skills.
                  </p>

                </div>


                <div className="feature-card">

                  <div className="feature-icon">
                    ▱
                  </div>

                  <h3>
                    Progress Tracking
                  </h3>

                  <p>
                    Keep track of your practice and
                    improve over time.
                  </p>

                </div>


                <div className="feature-card">

                  <div className="feature-icon">
                    ◆
                  </div>

                  <h3>
                    Points &amp; Rewards
                  </h3>

                  <p>
                    Complete activities and earn
                    points as you learn.
                  </p>

                </div>

              </div>

            </section>


            {/* ==================================================
                HOW IT WORKS
                ================================================== */}

            <section
              className="how-section"
              id="how-it-works"
            >

              <div className="section-title">

                <h2>
                  How It Works
                </h2>

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


            {/* ==================================================
                ABOUT
                ================================================== */}

            <section
              className="about-section"
              id="about"
            >

              <div className="about-title">

                <h2>
                  Why aktiv?
                </h2>

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


            {/* CTA */}

            <section className="cta-section">

              <h2>
                Ready to improve your skills?
              </h2>

              <button
                className="cta-button"
                onClick={goActivities}
              >
                Start Practicing
              </button>

            </section>


            {/* FOOTER */}

            <footer className="footer">

              <strong>

                <img
                  src="/aktivLogo.png"
                  alt="aktiv"
                  className="aktiv-logo"
                />

              </strong>


              <div className="footer-links">

                <button
                  onClick={() =>
                    scrollToSection('about')
                  }
                >
                  About
                </button>

                <button
                  onClick={() =>
                    scrollToSection('features')
                  }
                >
                  Features
                </button>

                <button onClick={openLogin}>
                  Contact
                </button>

                <button
                  onClick={() =>
                    scrollToSection('how-it-works')
                  }
                >
                  Privacy Policy
                </button>

                <button onClick={goHome}>
                  Terms
                </button>

              </div>

            </footer>

          </>
        )}


        {/* ==================================================
            ACTIVITIES PAGE
            ================================================== */}

        {page === 'activities' && (
          <section className="activities-page">

            <div className="activities-container">

              <div className="activities-banner">

                <img
                  src="/sas.png"
                  alt="Welcome to aktiv"
                />

              </div>


              <div className="activities-title">

                <h1>
                  Available Activities
                </h1>

                <p>
                  Select an activity below to practice
                  and strengthen your skills.
                </p>

              </div>


              <div className="activities-grid">

                {activities.map(
                  (activity) => (
                    <article
                      key={activity.title}
                      className="activity-card"
                    >

                      <div className="activity-card-top">

                        <div className="activity-icon">

                          {renderActivityIcon(
                            activity.icon
                          )}

                        </div>


                        <div className="activity-card-heading">

                          <div className="activity-heading-row">

                            <h2>
                              {activity.title}
                            </h2>

                            <span
                              className={`activity-status ${activity.type}`}
                            >

                              {(activity.type ===
                                'completed' ||
                                activity.type ===
                                  'in-progress') && (
                                <span className="status-dot">
                                  ●
                                </span>
                              )}

                              {activity.status}

                            </span>

                          </div>


                          <p>
                            {activity.description}
                          </p>

                        </div>

                      </div>


                      <div className="activity-card-bottom">

                        <button
                          className={
                            activity.type ===
                            'completed'
                              ? 'activity-btn primary'
                              : 'activity-btn'
                          }
                          onClick={() =>
                            startActivity(
                              activity.action
                            )
                          }
                        >

                          {activity.type ===
                          'completed'
                            ? 'View Activity →'
                            : 'Start Activity →'}

                        </button>

                      </div>

                    </article>
                  )
                )}

              </div>

            </div>


            <footer className="activities-footer">

              <div>

                <strong>

                  <img
                    src="/aktivLogo.png"
                    alt="aktiv"
                    className="aktiv-logo"
                  />

                </strong>

                <span>
                  © 2026 aktiv inc. All rights reserved.
                </span>

              </div>


              <div className="activities-footer-links">

                <button
                  onClick={() =>
                    scrollToSection('about')
                  }
                >
                  About
                </button>

                <button
                  onClick={() =>
                    scrollToSection('features')
                  }
                >
                  Features
                </button>

                <button onClick={openLogin}>
                  Contact
                </button>

                <button
                  onClick={() =>
                    alert('Privacy Policy')
                  }
                >
                  Privacy Policy
                </button>

                <button
                  onClick={() =>
                    alert('Terms')
                  }
                >
                  Terms
                </button>

              </div>

            </footer>

          </section>
        )}


        {/* ==================================================
            SETTINGS
            ================================================== */}

        {page === 'settings' && (
          <section className="settings-page">

            <div className="settings-container">

              <div className="settings-header">

                <h1>
                  Settings
                </h1>

                <div className="settings-title-line"></div>

                <p>
                  Manage your profile, reminders and how aktiv looks and feels.
                </p>

              </div>


              <div className="settings-layout">

                <aside className="settings-sidebar">

                  <button
                    type="button"
                    className={
                      settingsTab === 'account'
                        ? 'settings-tab active'
                        : 'settings-tab'
                    }
                    onClick={() =>
                      setSettingsTab('account')
                    }
                  >

                    <span className="settings-tab-icon">
                      👤
                    </span>

                    <span>
                      Account
                    </span>

                  </button>


                  <button
                    type="button"
                    className={
                      settingsTab === 'notification'
                        ? 'settings-tab active'
                        : 'settings-tab'
                    }
                    onClick={() =>
                      setSettingsTab(
                        'notification'
                      )
                    }
                  >

                    <span className="settings-tab-icon">
                      🔔
                    </span>

                    <span>
                      Notification
                    </span>

                  </button>


                  <button
                    type="button"
                    className={
                      settingsTab === 'manage'
                        ? 'settings-tab active'
                        : 'settings-tab'
                    }
                    onClick={() =>
                      setSettingsTab('manage')
                    }
                  >

                    <span className="settings-tab-icon">
                      ⚙
                    </span>

                    <span>
                      Manage account / Log out
                    </span>

                  </button>

                </aside>


                <div className="settings-content">

                  {/* ACCOUNT */}

                  {settingsTab === 'account' && (
                    <div className="settings-panel">

                      <div className="settings-panel-header">

                        <h2>
                          Account settings
                        </h2>

                        <p>
                          Update how you appear and how you sign in
                        </p>

                      </div>


                      <div className="settings-divider"></div>


                      <div className="profile-row">

                        <div className="profile-avatar">

                          {loggedInUsername
                            ? loggedInUsername
                                .substring(0, 2)
                                .toUpperCase()
                            : 'U'}

                        </div>


                        <button
                          type="button"
                          className="edit-profile-btn"
                          onClick={() =>
                            alert(
                              'Edit profile coming soon!'
                            )
                          }
                        >
                          Edit profile
                        </button>

                      </div>


                      <div className="account-fields">

                        <div className="account-field">

                          <label>
                            Display Name
                          </label>

                          <input
                            type="text"
                            placeholder="Display Name"
                            value={
                              loggedInUsername
                            }
                            onChange={(e) =>
                              setLoggedInUsername(
                                e.target.value
                              )
                            }
                          />

                        </div>


                        <div className="account-field">

                          <label>
                            Email
                          </label>

                          <input
                            type="email"
                            value={
                              signupEmail ||
                              loginEmail
                            }
                            onChange={(e) =>
                              setSignupEmail(
                                e.target.value
                              )
                            }
                          />

                        </div>


                        <div className="account-field">

                          <label>
                            New password
                          </label>

                          <input
                            type="password"
                          />

                        </div>


                        <div className="account-field">

                          <label>
                            Confirm password
                          </label>

                          <input
                            type="password"
                          />

                        </div>

                      </div>


                      <div className="settings-actions">

                        <button
                          type="button"
                          className="cancel-settings"
                          onClick={goHome}
                        >
                          Cancel
                        </button>

                        <button
                          type="button"
                          className="save-settings"
                          onClick={() =>
                            alert(
                              'Account settings saved!'
                            )
                          }
                        >
                          Save Changes
                        </button>

                      </div>

                    </div>
                  )}


                  {/* NOTIFICATIONS */}

                  {settingsTab === 'notification' && (
                    <div className="settings-panel notification-panel">

                      <div className="settings-panel-header">

                        <h2>
                          Manage Notifications
                        </h2>

                        <p>
                          Choose what aktiv tells you about.
                        </p>

                      </div>


                      <div className="settings-divider"></div>


                      <div className="notification-list">

                        <div className="notification-row">

                          <div>

                            <h3>
                              Activity reminders
                            </h3>

                            <p>
                              A nudge when you have steps left to finish.
                            </p>

                          </div>


                          <button
                            type="button"
                            className={
                              notifications.activityReminders
                                ? 'toggle active'
                                : 'toggle'
                            }
                            onClick={() =>
                              toggleNotification(
                                'activityReminders'
                              )
                            }
                          >
                            <span></span>
                          </button>

                        </div>


                        <div className="notification-row">

                          <div>

                            <h3>
                              Progress updates
                            </h3>

                            <p>
                              Weekly summary of completed activities.
                            </p>

                          </div>


                          <button
                            type="button"
                            className={
                              notifications.progressUpdates
                                ? 'toggle active'
                                : 'toggle'
                            }
                            onClick={() =>
                              toggleNotification(
                                'progressUpdates'
                              )
                            }
                          >
                            <span></span>
                          </button>

                        </div>


                        <div className="notification-row">

                          <div>

                            <h3>
                              New activities
                            </h3>

                            <p>
                              Tell me when new practice activities are added.
                            </p>

                          </div>


                          <button
                            type="button"
                            className={
                              notifications.newActivities
                                ? 'toggle active'
                                : 'toggle'
                            }
                            onClick={() =>
                              toggleNotification(
                                'newActivities'
                              )
                            }
                          >
                            <span></span>
                          </button>

                        </div>


                        <div className="notification-row">

                          <div>

                            <h3>
                              Email notifications
                            </h3>

                            <p>
                              Send these to my email as well.
                            </p>

                          </div>


                          <button
                            type="button"
                            className={
                              notifications.emailNotifications
                                ? 'toggle active'
                                : 'toggle'
                            }
                            onClick={() =>
                              toggleNotification(
                                'emailNotifications'
                              )
                            }
                          >
                            <span></span>
                          </button>

                        </div>

                      </div>


                      <div className="settings-actions">

                        <button
                          type="button"
                          className="cancel-settings"
                          onClick={goHome}
                        >
                          Cancel
                        </button>

                        <button
                          type="button"
                          className="save-settings"
                          onClick={() =>
                            alert(
                              'Notification settings saved!'
                            )
                          }
                        >
                          Save Changes
                        </button>

                      </div>

                    </div>
                  )}


                  {/* MANAGE ACCOUNT */}

                  {settingsTab === 'manage' && (
                    <div className="manage-settings">

                      <div className="settings-panel manage-panel">

                        <div className="settings-panel-header">

                          <h2>
                            Manage account / Log out
                          </h2>

                        </div>


                        <div className="settings-divider"></div>


                        <div className="manage-row">

                          <h3>
                            Log out account?
                          </h3>

                          <button
                            type="button"
                            className="logout-btn"
                            onClick={handleLogout}
                          >
                            Log out
                          </button>

                        </div>

                      </div>


                      <div className="settings-panel delete-panel">

                        <div>

                          <h3>
                            Delete account
                          </h3>

                          <p>
                            This removes your activities and progress and can't be undone.
                          </p>

                        </div>


                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() =>
                            alert(
                              'Delete account confirmation coming soon.'
                            )
                          }
                        >
                          Delete account
                        </button>

                      </div>

                    </div>
                  )}

                </div>

              </div>

            </div>

          </section>
        )}


        {/* ==================================================
            AUTHENTICATION
            ================================================== */}

        {page === 'auth' && (
          <section className="auth-page">

            {/* ==================================================
                LOGIN
                ================================================== */}

            {authMode === 'login' && (
              <div className="auth-layout">

                <form
                  className="auth-form"
                  onSubmit={handleLogin}
                >

                  <div className="auth-intro">

                    <span>
                      HELLO PROGRAMMER!
                    </span>

                    <h1>
                      Welcome!
                    </h1>

                    <p>
                      Log in to continue your coding journey
                      and keep building your skills with aktiv.
                    </p>

                  </div>


                  <div className="auth-field">

                    <label>
                      Email Address
                    </label>

                    <div
                      className={`auth-input ${
                        loginError
                          ? 'input-error'
                          : ''
                      }`}
                    >

                      <span>
                        ✉
                      </span>

                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={loginEmail}
                        onChange={(e) => {
                          setLoginEmail(
                            e.target.value
                          )

                          setLoginError('')
                        }}
                      />

                    </div>

                  </div>


                  <div className="auth-field">

                    <label>
                      Password
                    </label>

                    <div
                      className={`auth-input ${
                        loginError
                          ? 'input-error'
                          : ''
                      }`}
                    >

                      <span>
                        🔒︎
                      </span>

                      <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => {
                          setPassword(
                            e.target.value
                          )

                          setLoginError('')
                        }}
                      />

                    </div>


                    <div className="password-row">

                      {loginError ? (
                        <small className="login-error">
                          {loginError}
                        </small>
                      ) : (
                        <span></span>
                      )}


                      <button
                        type="button"
                        className="forgot-password"
                        onClick={() =>
                          alert(
                            'Forgot Password feature coming soon!'
                          )
                        }
                      >
                        Forgot Password?
                      </button>

                    </div>

                  </div>


                  <button
                    type="submit"
                    className="auth-submit"
                  >
                    Log In →
                  </button>


                  <div className="or-divider">

                    <span></span>

                    <p>
                      OR
                    </p>

                    <span></span>

                  </div>


                  <button
                    type="button"
                    className="google-button"
                    onClick={() =>
                      alert(
                        'Google Sign Up coming soon!'
                      )
                    }
                  >

                    <strong>
                      G
                    </strong>

                    Sign Up with Google

                  </button>


                  <p className="switch-account">

                    Don't have an account?

                    <button
                      type="button"
                      onClick={openSignup}
                    >
                      Sign Up
                    </button>

                  </p>

                </form>


                <div className="auth-visual">

                  <div className="circle circle-one"></div>

                  <div className="circle circle-two"></div>

                  <div className="code-window">

                    <div className="code-top">

                      <span></span>
                      <span></span>
                      <span></span>

                    </div>


                    <div className="code-content">

                      <p>
                        function learn() &#123;
                      </p>

                      <p className="code-indent">
                        return &#123;
                      </p>

                      <p className="code-indent-two">
                        skills: true,
                      </p>

                      <p className="code-indent-two">
                        progress: "continuous",
                      </p>

                      <p className="code-indent-two">
                        future: "bright"
                      </p>

                      <p className="code-indent">
                        &#125;;
                      </p>

                      <p>
                        &#125;
                      </p>

                      <p className="code-comment">
                        // Keep coding. Keep learning.
                      </p>

                    </div>

                  </div>


                  <div className="visual-text">

                    <h2>
                      Build Skills.
                      <br />
                      Create Opportunities.
                    </h2>

                    <p>
                      Whether you're a beginner or looking
                      to level up, aktiv gives you the tools
                      and challenges to become a better
                      programmer — one step at a time.
                    </p>

                  </div>

                </div>

              </div>
            )}


            {/* ==================================================
                SIGN UP
                ================================================== */}

            {authMode === 'signup' && (
              <div className="auth-layout">

                <form
                  className="auth-form signup-form"
                  onSubmit={handleSignup}
                >

                  <div className="auth-intro">

                    <span>
                      CREATE AN ACCOUNT
                    </span>

                    <h1>
                      Start Your Coding Journey
                    </h1>

                    <p>
                      Join aktiv today and get access to
                      interactive coding challenges, real-time
                      feedback, and a community of learners.
                    </p>

                  </div>


                  {/* FULL NAME */}

                  <div className="auth-field">

                    <label>
                      Full Name
                    </label>

                    <div className="auth-input">

                      <span>
                        👤
                      </span>

                      <input
                        type="text"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) =>
                          setFullName(
                            e.target.value
                          )
                        }
                      />

                    </div>

                  </div>


                  {/* USERNAME REMOVED */}

                  {/* EMAIL */}

                  <div className="auth-field">

                    <label>
                      Email Address
                    </label>

                    <div className="auth-input">

                      <span>
                        ✉
                      </span>

                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={signupEmail}
                        onChange={(e) =>
                          setSignupEmail(
                            e.target.value
                          )
                        }
                      />

                    </div>

                  </div>


                  {/* PASSWORD */}

                  <div className="auth-field">

                    <label>
                      Password
                    </label>

                    <div className="auth-input">

                      <span>
                        🔒︎
                      </span>

                      <input
                        type="password"
                        placeholder="Create a password"
                        value={signupPassword}
                        onChange={(e) =>
                          setSignupPassword(
                            e.target.value
                          )
                        }
                      />

                    </div>

                  </div>


                  {/* CONFIRM PASSWORD */}

                  <div className="auth-field">

                    <label>
                      Confirm Password
                    </label>

                    <div className="auth-input">

                      <span>
                        🔒︎
                      </span>

                      <input
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) =>
                          setConfirmPassword(
                            e.target.value
                          )
                        }
                      />

                    </div>

                  </div>


                  <button
                    type="submit"
                    className="auth-submit"
                  >
                    Sign Up →
                  </button>


                  <div className="or-divider">

                    <span></span>

                    <p>
                      OR
                    </p>

                    <span></span>

                  </div>


                  <button
                    type="button"
                    className="google-button"
                    onClick={() =>
                      alert(
                        'Google Sign Up coming soon!'
                      )
                    }
                  >

                    <strong>
                      G
                    </strong>

                    Sign Up with Google

                  </button>


                  <p className="switch-account">

                    Already have an account?

                    <button
                      type="button"
                      onClick={openLogin}
                    >
                      Log In
                    </button>

                  </p>

                </form>


                {/* SIGN UP VISUAL */}

                <div className="auth-visual">

                  <div className="circle circle-one"></div>

                  <div className="circle circle-two"></div>

                  <div className="code-window">

                    <div className="code-top">

                      <span></span>
                      <span></span>
                      <span></span>

                    </div>


                    <div className="code-content">

                      <p>
                        function learn() &#123;
                      </p>

                      <p className="code-indent">
                        return &#123;
                      </p>

                      <p className="code-indent-two">
                        skills: true,
                      </p>

                      <p className="code-indent-two">
                        progress: "continuous",
                      </p>

                      <p className="code-indent-two">
                        future: "bright"
                      </p>

                      <p className="code-indent">
                        &#125;;
                      </p>

                      <p>
                        &#125;
                      </p>

                      <p className="code-comment">
                        // Keep coding. Keep learning.
                      </p>

                    </div>

                  </div>


                  <div className="visual-text">

                    <h2>
                      Build Skills.
                      <br />
                      Create Opportunities.
                    </h2>

                    <p>
                      Whether you're a beginner or looking
                      to level up, aktiv gives you the tools
                      and challenges to become a better
                      programmer — one step at a time.
                    </p>

                  </div>

                </div>

              </div>
            )}

          </section>
        )}

      </section>

    </main>
  )
}

export default App