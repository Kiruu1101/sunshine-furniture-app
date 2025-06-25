import React from 'react';
import '../styles/Footer.css';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h5>Company</h5>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="#careers">Careers</a></li>
            <li><a href="#stores">Our Stores</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h5>Help</h5>
          <ul>
            <li><a href="#track-order">Track Your Order</a></li>
            <li><a href="#returns">Returns</a></li>
            <li><a href="#warranty">Warranty</a></li>
            <li><a href="#faqs">FAQs</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h5>Address</h5>
          <address>
            SunshineFurnitureStore Pvt. Ltd.<br />
            123 Furniture Lane,<br />
            Pune, India - 411047<br />
            Email: kirangr811@gmail.com
          </address>
        </div>
        <div className="footer-section social">
          <h5>Follow Us</h5>
          <div className="social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} SUNSHINE Furniture Store. All Rights Reserved. 
        <br/>~By Kiran Chavan
      </div>
    </footer>
  );
}
