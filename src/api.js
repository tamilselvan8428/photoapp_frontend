import axios from 'axios'

const API_ROOT = import.meta.env.VITE_API_ROOT || 'https://photoapp-backend-p9ct.onrender.com'
const axiosInstance = axios.create({
  baseURL: API_ROOT,
  withCredentials: true
})

export async function getCurrentUser() {
  const res = await axiosInstance.get('/api/current_user')
  return res.data
}

export async function fetchPhotos() {
  const res = await axiosInstance.get('/api/photos', {
    withCredentials: true  
  });
  return res.data;
}

export async function fetchPhoto(id) {
  const res = await axiosInstance.get(`/api/photos/${id}`)
  return res.data
}
export async function uploadPhoto(photoData) {
  const res = await axiosInstance.post('/api/photos', photoData, {
    withCredentials: true
  });
  return res.data;
}

export function getGoogleAuthUrl() {
  return `${API_ROOT}/auth/google`
}
export async function deletePhoto(photoId) {
  try {
    const res = await axiosInstance.delete(`/api/photos/${photoId}`, {
      withCredentials: true
    });
    return res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to delete photo. Please try again.';
    throw new Error(errorMessage);
  }
}
export async function logout() {
  const res = await axiosInstance.post('/api/logout')
  return res.data
}

export async function sendOtp(email) {
  try {
    const res = await axiosInstance.post('/api/auth/send-otp', { email });
    return res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to send OTP. Please try again.';
    throw new Error(errorMessage);
  }
}
