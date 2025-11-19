import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Login from './pages/Login/Login'
import Upload from './pages/Upload/Upload'
import Gallery from './pages/Gallery/Gallery'
import Landing from './pages/Landing/Landing'
import PhotoDetails from './pages/PhotoDetails/PhotoDetails'
import NotFound from './pages/NotFound/NotFound'
import Navbar from './components/Navbar'
import { getCurrentUser, logout } from './api'
import './App.css'

export default function App() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  // -----------------------------
  //  FETCH CURRENT USER ON LOAD
  // -----------------------------
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser()
        setUser(res?.data?.user ?? null)   // FIX: MUST use res.data.user
      } catch (error) {
        console.error("Error fetching user:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }
    fetchUser()
  }, [])

  // -----------------------------
  //  HANDLE LOGOUT
  // -----------------------------
  async function handleLogout() {
    try {
      await logout()
      setUser(null)
      navigate("/login", { replace: true })
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  // -----------------------------
  //  LOADING SCREEN
  // -----------------------------
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // -----------------------------
  //  PROTECTED ROUTE WRAPPER
  // -----------------------------
  const Protected = ({ children }) => {
    return user ? children : <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} onLogout={handleLogout} />

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>

            <Route path="/" element={<Landing />} />

            <Route
              path="/gallery"
              element={
                <Protected>
                  <Gallery user={user} />
                </Protected>
              }
            />

            <Route
              path="/upload"
              element={
                <Protected>
                  <Upload user={user} />
                </Protected>
              }
            />

            <Route
              path="/photo/:id"
              element={
                <Protected>
                  <PhotoDetails user={user} />
                </Protected>
              }
            />

            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/gallery" replace />}
            />

            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />

          </Routes>
        </AnimatePresence>
      </main>

      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} PhotoGallery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
