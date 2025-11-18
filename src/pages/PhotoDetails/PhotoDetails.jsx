import React, { useEffect, useState } from "react"
import "./PhotoDetails.css"
import { fetchPhoto, deletePhoto } from "../../api"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeftIcon, EllipsisHorizontalIcon, ArrowDownTrayIcon, TrashIcon } from "@heroicons/react/24/outline"
import { format } from 'date-fns'

export default function PhotoDetails({ user }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [photo, setPhoto] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showOptions, setShowOptions] = useState(false)

  useEffect(() => {
    const loadPhoto = async () => {
      try {
        const data = await fetchPhoto(id)
        setPhoto(data)
      } catch (err) {
        console.error("Error loading photo:", err)
        setError("Failed to load photo. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    loadPhoto()
  }, [id])

  const handleDownload = () => {
    if (!photo) return
    
    const link = document.createElement('a')
    link.href = photo.imageBase64
    link.download = photo.title || 'download'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setShowOptions(false)
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await deletePhoto(photo._id)
        navigate('/gallery', { state: { refresh: true } })
      } catch (err) {
        console.error("Error deleting document:", err)
        setError("Failed to delete document. Please try again.")
      }
    }
    setShowOptions(false)
  }

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading document...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          Retry
        </button>
      </div>
    )
  }

  if (!photo) {
    return (
      <div className="not-found">
        <h2>Document not found</h2>
        <button onClick={() => navigate('/gallery')} className="back-button">
          Back to Gallery
        </button>
      </div>
    )
  }
  const isPdf = photo.mimetype === 'application/pdf' || photo.filename?.endsWith('.pdf')

  return (
    <div className="photo-detail-container">
      <div className="photo-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeftIcon className="icon" />
          Back
        </button>
        
        <div className="photo-actions">
          <div className="options-container">
            <button 
              className="options-button"
              onClick={() => setShowOptions(!showOptions)}
              aria-label="More options"
            >
              <EllipsisHorizontalIcon className="icon" />
            </button>
            
            {showOptions && (
              <div className="options-dropdown">
                <button onClick={handleDownload} className="dropdown-item">
                  <ArrowDownTrayIcon className="dropdown-icon" />
                  Download
                </button>
                {user && user._id === photo.user && (
                  <button onClick={handleDelete} className="dropdown-item delete">
                    <TrashIcon className="dropdown-icon" />
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="photo-content">
        <div className="document-viewer">
          {isPdf ? (
            <iframe 
              src={photo.imageBase64} 
              title={photo.title || 'Document'}
              className="document-iframe"
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          ) : (
            <img 
              src={photo.imageBase64} 
              alt={photo.title || 'Document'} 
              className="document-image"
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            />
          )}
        </div>

        <div className="photo-meta">
          <div className="meta-section">
            <h1 className="photo-title">{photo.title || 'Untitled Document'}</h1>
            {photo.description && (
              <p className="photo-description">{photo.description}</p>
            )}
          </div>

          <div className="meta-section">
            <div className="meta-item">
              <span className="meta-label">Uploaded on:</span>
              <span className="meta-value">
                {format(new Date(photo.createdAt), 'MMMM d, yyyy')}
              </span>
            </div>
            {photo.mimetype && (
              <div className="meta-item">
                <span className="meta-label">File type:</span>
                <span className="meta-value">
                  {photo.mimetype.split('/')[1]?.toUpperCase() || 'Unknown'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}