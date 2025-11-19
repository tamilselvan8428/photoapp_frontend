import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getGoogleAuthUrl } from "../../api"
import axios from "axios"
import "./Login.css"

export default function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ text: "", type: "" })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email || !password) {
      setMessage({ text: "Please fill in all required fields", type: "error" })
      return
    }

    if (!isLogin && !displayName) {
      setMessage({ text: "Please enter your name", type: "error" })
      return
    }

    setIsLoading(true)
    setMessage({ text: "", type: "" })

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
      const payload = isLogin 
        ? { email, password }
        : { email, password, displayName }

      const response = await axios.post(
        `https://photoapp-backend-p9ct.onrender.com${endpoint}`, 
        payload,
        { withCredentials: true }
      )

      if (response.data.success) {
        setMessage({ 
          text: isLogin ? "Login successful!" : "Registration successful!", 
          type: "success" 
        })
        navigate("/")
        window.location.reload()
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
        (isLogin ? "Login failed" : "Registration failed")
      setMessage({ 
        text: errorMessage, 
        type: "error" 
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = getGoogleAuthUrl()
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
        <p className="subtitle">
          {isLogin ? 'Sign in to access your account' : 'Create a new account to get started'}
        </p>
        
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="displayName">Full Name</label>
              <input
                type="text"
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your name"
                disabled={isLoading}
              />
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isLogin ? "Enter your password" : "Create a password"}
              required
              disabled={isLoading}
            />
          </div>
          
          <button 
            type="submit" 
            className="btn primary"
            disabled={isLoading}
          >
            {isLoading 
              ? (isLogin ? 'Signing in...' : 'Creating account...')
              : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <button 
          onClick={handleGoogleLogin}
          className="btn google"
          disabled={isLoading}
        >
          <svg className="google-icon" viewBox="0 0 24 24" width="18" height="18">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <p className="signup-link">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button" 
            className="btn primary"
            onClick={() => {
              setIsLogin(!isLogin)
              setMessage({ text: '', type: '' })
            }}
            style={{
              background: 'transparent',
              color: '#4f46e5',
              border: '1px solid #4f46e5',
              marginTop: '1rem',
              width: '100%'
            }}
          >
            {isLogin ? 'Create an account' : 'Back to Sign In'}
          </button>
        </p>
      </div>
    </div>
  )
}
