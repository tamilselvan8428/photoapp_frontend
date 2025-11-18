import { Link, useLocation } from "react-router-dom"
import "./Navbar.css"

export default function Navbar({ user, onLogout }) {
  const location = useLocation()
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U'
  }
  return (
    <nav className="nav">
      <Link to="/" className="logo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="currentColor"/>
          <path d="M12 4C12.5523 4 13 4.44772 13 5V7C13 7.55228 12.5523 8 12 8C11.4477 8 11 7.55228 11 7V5C11 4.44772 11.4477 4 12 4Z" fill="currentColor"/>
          <path d="M12 16C12.5523 16 13 16.4477 13 17V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V17C11 16.4477 11.4477 16 12 16Z" fill="currentColor"/>
          <path d="M17.6569 6.34314C18.0474 6.73366 18.0474 7.36683 17.6569 7.75735L16.2426 9.17157C15.8521 9.5621 15.219 9.5621 14.8284 9.17157C14.4379 8.78105 14.4379 8.14788 14.8284 7.75735L16.2426 6.34314C16.6332 5.95262 17.2663 5.95262 17.6569 6.34314Z" fill="currentColor"/>
          <path d="M7.75736 14.8284C8.14788 14.4379 8.14788 13.8047 7.75736 13.4142C7.36683 13.0237 6.73367 13.0237 6.34314 13.4142L4.92893 14.8284C4.53841 15.219 4.53841 15.8521 4.92893 16.2426C5.31946 16.6332 5.95262 16.6332 6.34314 16.2426L7.75736 14.8284Z" fill="currentColor"/>
          <path d="M19 12C19 11.4477 19.4477 11 20 11H22C22.5523 11 23 11.4477 23 12C23 12.5523 22.5523 13 22 13H20C19.4477 13 19 12.5523 19 12Z" fill="currentColor"/>
          <path d="M2 12C2 11.4477 2.44772 11 3 11H5C5.55228 11 6 11.4477 6 12C6 12.5523 5.55228 13 5 13H3C2.44772 13 2 12.5523 2 12Z" fill="currentColor"/>
          <path d="M16.2426 16.2426C15.8521 15.8521 15.8521 15.219 16.2426 14.8284C16.6332 14.4379 17.2663 14.4379 17.6569 14.8284L19.0711 16.2426C19.4616 16.6332 19.4616 17.2663 19.0711 17.6569C18.6805 18.0474 18.0474 18.0474 17.6569 17.6569L16.2426 16.2426Z" fill="currentColor"/>
          <path d="M7.75736 9.17157C8.14788 9.5621 7.78105 10.219 7.17157 9.82843C6.5621 9.43785 6.5621 8.56215 7.17157 8.17157L8.58579 6.75736C8.97631 6.36683 9.60948 6.36683 10 6.75736C10.3905 7.14788 10.3905 7.78105 10 8.17157L7.75736 9.17157Z" fill="currentColor"/>
        </svg>
        PhotoApp
      </Link>

      <div className="nav-right">
        {user ? (
          <>
            <Link 
              to="/gallery" 
              className={`nav-link ${location.pathname === '/gallery' ? 'active' : ''}`}
            >
              Gallery
            </Link>
            <Link 
              to="/upload" 
              className={`nav-link ${location.pathname === '/upload' ? 'active' : ''}`}
            >
              Upload
            </Link>
            <div className="username">
              <div className="user-avatar">
                {getInitial(user.displayName || user.email)}
              </div>
              <span>{user.displayName || user.email.split('@')[0]}</span>
            </div>
            <button 
              onClick={onLogout}
              className="logout-btn"
            >
              Logout
            </button>
          </>
        ) : (
          <Link 
            to="/login" 
            className="login-btn"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}