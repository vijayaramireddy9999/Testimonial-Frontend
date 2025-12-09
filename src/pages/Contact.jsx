import { useState } from "react";

const Contact = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); 


    setShowPopup(true);

    
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);


    e.target.reset();
  };

  return (
    <div className="container">
      <h1>Contact Us</h1>

      <p style={{ marginTop: "12px", marginBottom: "30px", color: "#ccc" }}>
        Have questions, feedback, or suggestions? Reach out to us.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" placeholder="Enter your name" required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea
            rows="5"
            placeholder="Type your message here..."
            required
          ></textarea>
        </div>

        <button type="submit">Send Message</button>
      </form>

    
      {showPopup && (
        <div className="popup">
          ✅ Your response was sent successfully
        </div>
      )}
    </div>
  );
};

export default Contact;
