import axios from 'axios'

// ----------------------------------------
// BASE API CONFIG
// ----------------------------------------
const API_ROOT =
  import.meta.env.VITE_API_ROOT ||
  'https://photoapp-backend-p9ct.onrender.com'

const axiosInstance = axios.create({
  baseURL: API_ROOT,
  withCredentials: true
})

// ----------------------------------------
// GET CURRENT USER
// ----------------------------------------
export async function getCurrentUser() {
  try {
    const res = await axiosInstance.get('/api/current_user')
    return res // <-- return full response
  } catch (error) {
    console.error("getCurrentUser Error:", error)
    return { data: { user: null } } // fallback
  }
}

// ----------------------------------------
// PHOTOS
// ----------------------------------------
export async function fetchPhotos() {
  const res = await axiosInstance.get('/api/photos')
  return res.data
}

export async function fetchPhoto(id) {
  const res = await axiosInstance.get(`/api/photos/${id}`)
  return res.data
}

export async function uploadPhoto(photoData) {
  const res = await axiosInstance.post('/api/photos', photoData)
  return res.data
}

export async function deletePhoto(photoId) {
  try {
    const res = await axiosInstance.delete(`/api/photos/${photoId}`)
    return res.data
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      'Failed to delete photo. Please try again.'
    throw new Error(errorMessage)
  }
}

// ----------------------------------------
// AUTH
// ----------------------------------------
export function getGoogleAuthUrl() {
  return `${API_ROOT}/auth/google`
}

export async function logout() {
  const res = await axiosInstance.post('/api/logout')
  return res.data
}

export async function sendOtp(email) {
  try {
    const res = await axiosInstance.post('/api/auth/send-otp', { email })
    return res.data
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      'Failed to send OTP. Please try again.'
    throw new Error(errorMessage)
  }
}
