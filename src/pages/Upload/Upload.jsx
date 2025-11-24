import React, { useState } from "react"
import "./Upload.css"
import { uploadPhoto } from "../../api"
import { useNavigate } from "react-router-dom"

export default function Upload({ user }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [fileData, setFileData] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const navigate = useNavigate()

  function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }
    if (file.size > 1 * 1024 * 1024) {
      alert('File size should be less than 5MB')
      return
    }
    
    const reader = new FileReader()
    reader.onload = () => setFileData(reader.result)
    reader.readAsDataURL(file)
  }

async function handleSubmit(e) {
  e.preventDefault();
  if (!fileData) {
    alert('Please select an image to upload');
    return;
  }
  
  try {
    setIsUploading(true);
    await uploadPhoto({ 
      title,
      description, 
      imageBase64: fileData 
    });
    alert('Photo uploaded successfully!',file.size*1024*1024);
    navigate('/gallery', { state: { refresh: true } });
  } catch (error) {
    console.error('Upload failed:', error);
    alert('Failed to upload photo. Please try again.');
  } finally {
    setIsUploading(false);
  }
}

  return (
    <div className="upload-wrapper">
      <form className="upload-card" onSubmit={handleSubmit}>
        <h2>Upload Photo</h2>

        <input 
          type="text"
          placeholder="Title"
          value={title} 
          onChange={e => setTitle(e.target.value)}
          required
        />

        <textarea 
          placeholder="Description (optional)"
          value={description} 
          onChange={e => setDescription(e.target.value)}
        />

        <div className="file-upload-container">
          <label className="file-upload-label">
            Choose Image
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFile}
              className="file-input"
              required
            />
          </label>
          {fileData && (
            <div className="preview-container">
              <img src={fileData} alt="preview" className="preview-image" />
              <button 
                type="button" 
                onClick={() => setFileData('')}
                className="remove-image-btn"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        <button 
          type="submit" 
          disabled={isUploading || !fileData}
          className={`upload-button ${isUploading ? 'uploading' : ''}`}
        >
          {isUploading ? 'Uploading...' : 'Upload Photo'}
        </button>
      </form>
    </div>
  )
}
