import React from 'react';
import '../styles/ContactUs.css';

const ContactUs = () => {
  const [formSubmit, setFormSubmit] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmit(true);
      event.target.reset();
    }, 1000); 
  };

  return (
    <div className="contact-container" >
      {formSubmit ? (
        <p className="success-message">
          ✅ Thank you for reaching out! We have received your message. Our team will contact you soon.
        </p>
      ) : (
        <>
          <h2 className="contact-heading">📩 Get in Touch</h2>
          <p className="contact-subheading">
            Your feedback and questions are important to us. Use the form below to connect.
          </p>
          <form onSubmit={handleFormSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name<span>*</span></label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email<span>*</span></label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message<span>*</span></label>
              <textarea id="message" name="message" rows="5" required />
            </div>
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ContactUs;
