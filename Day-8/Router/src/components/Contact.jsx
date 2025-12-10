function Contact() {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Get in touch with MyStore.</p>
        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-item">
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="contact-item">
              <h3> Email</h3>
              <p>info@mystore.com</p>
            </div>
            <div className="contact-item">
              <h3> Address</h3>
              <p>123 Store Street<br />City, State 12345</p>
            </div>
            <div className="contact-item">
              <h3> Hours</h3>
              <p>Mon-Fri: 9AM-6PM<br />Sat-Sun: 10AM-4PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
