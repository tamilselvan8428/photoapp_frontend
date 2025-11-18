import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PhotoIcon, ArrowUpTrayIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { fetchPhotos } from "../../api";
import "./Gallery.css";

const Gallery = ({ user }) => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const loadPhotos = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const data = await fetchPhotos();
      setPhotos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading photos:", err);
      setError("Failed to load photos. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPhotos();
  }, [user, location.state?.refresh]);
  if (!user) {
    return <Navigate to="/login" state={{ from: '/gallery' }} replace />;
  }

  return (
    <div className="gallery-container">
      <header className="gallery-header">
        <div className="gallery-header-content">
          <h1 className="gallery-title">
            <button 
              onClick={() => navigate(-1)} 
              className="back-button"
              aria-label="Go back"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            My Photo Gallery
          </h1>
          <Link to="/upload" className="upload-button">
            <ArrowUpTrayIcon className="h-5 w-5" />
            <span>Upload Photo</span>
          </Link>
        </div>
        <p className="welcome-message">
          Welcome back, <span className="user-highlight">{user.displayName || user.email?.split('@')[0]}</span>!
        </p>
      </header>

      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your photos...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
          <button 
            onClick={loadPhotos} 
            className="retry-button"
          >
            Retry
          </button>
        </div>
      ) : photos.length === 0 ? (
        <div className="empty-state">
          <PhotoIcon className="empty-icon" />
          <h3>No photos yet</h3>
          <p>Get started by uploading your first photo</p>
          <Link to="/upload" className="cta-button">
            <ArrowUpTrayIcon className="h-5 w-5" />
            Upload Photo
          </Link>
        </div>
      ) : (
        <div className="gallery-grid">
          <AnimatePresence>
            {photos.map((photo) => (
              <motion.div
                key={photo._id}
                className="photo-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => navigate(`/photo/${photo._id}`)}
              >
                <div className="photo-image-container">
                  <img
                    src={photo.imageUrl || photo.imageBase64}
                    alt={photo.title || 'Untitled'}
                    className="photo-image"
                    loading="lazy"
                  />
                </div>
                <div className="photo-details">
                  <h3 className="photo-title">
                    {photo.title || 'Untitled'}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Gallery;