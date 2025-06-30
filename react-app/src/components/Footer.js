import React from 'react'
import { Link } from 'react-router-dom';
import './Footer.css';
function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Bringing happiness one pet at a time
        </p>
        <p className='footer-subscription-text'>
           Join us for a Furry adventure!
        </p>
      </section>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>About Us</h2>
            <Link to='/about'>How it works</Link>
            <Link to='/about'>Our Mission</Link>
          </div>
          <div class='footer-link-items'>
            <h2>Contact Us</h2>
            <Link to='/contact'>Contact</Link>
            <Link to='/contact'>Support</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>Social Media</h2>
            <Link to='/'>Instagram</Link>
            <Link to='/'>Facebook</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
