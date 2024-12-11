import React from 'react';
import './ContactUs.css';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

const ContactUs = () => {
  return (
    <div className="containercontact">
      <div className="info-box">
        <AlternateEmailIcon/>
        <p><strong>Address:</strong> A108 Adam Street, New York, NY 535022</p>
      </div>
      <div className="info-box">
        <LocationOnIcon/>
        <p><strong>Call Us:</strong> +212 611366340</p>
      </div>
      <div className="info-box">
        < LocalPhoneIcon/>
        <p><strong>Email Us:</strong> ilyas.aboulkassim@gmail.com</p>
      </div>
      <div className="info-box">
        <WatchLaterIcon />
        <p><strong>Opening Hours:</strong> Mon-Sat: 11AM - 23PM; Sunday: Closed</p>
      </div>
      <div className="form-container">
        <h2>Send Us a Message</h2>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <input type="text" placeholder="Subject" required />
          <textarea placeholder="Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
