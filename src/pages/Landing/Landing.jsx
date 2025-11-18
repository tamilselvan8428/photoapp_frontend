import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-container">
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Welcome to PhotoGallery</h1>
            <p>Share and discover amazing photos from around the world</p>
            <div className="cta-buttons">
              <Link to="/login" className="btn btn-primary">
                Get Started
              </Link>
              <a href="#features" className="btn btn-secondary">
                Learn More
              </a>
            </div>
          </div>
          <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80" 
              alt="Photo Gallery Showcase"
              className="hero-img"
            />
          </div>
        </div>
      </section>

      <section id="features" className="features">
        <h2>Why Choose Us</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📷</div>
            <h3>High Quality</h3>
            <p>Upload and view photos in stunning high resolution</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Fast & Reliable</h3>
            <p>Lightning fast loading times for the best experience</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure</h3>
            <p>Your photos are safe with our secure storage</p>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <h2>Get In Touch</h2>
        <div className="contact-container">
          <div className="contact-info">
            <h3>Have questions?</h3>
            <p>Reach out to us and we'll get back to you as soon as possible.</p>
            <div className="contact-details">
              <p>📧 tamilselvan24650@gmail.com</p>
            </div>
          </div>
          <form className="contact-form">
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <textarea placeholder="Your Message" rows="5" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Landing;
