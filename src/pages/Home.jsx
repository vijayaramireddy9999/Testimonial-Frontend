import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import heroimg from '../assets/41972448_8960722.jpg'

const Home = () => {
  const [testimonials, setTestimonials] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/testimonials/public")
      .then(res => setTestimonials(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      {/* HERO SECTION */}
     <section className="hero">
  <div className="hero-inner">

    <div className="hero-content">
      <h1>
        One Place for All <br />Your Testimonials
      </h1>

      <p>
        Store reviews from Google, Swiggy, Zomato and more —
        securely, beautifully, in one place.
      </p>

      <div className="hero-actions">
        <button onClick={() => navigate("/register")}>
          Get Started
        </button>
        <button
          className="secondary"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    </div>

    <div className="hero-image">
      <img
        src={heroimg}
        alt="Hero"
      />
    </div>

  </div>
</section>


      {/* PUBLIC TESTIMONIALS */}
      <section className="container">
        <h2 className="center">Recent Public Testimonials</h2>

        <div className="testimonial-grid">
          {testimonials.map(t => (
            <div key={t._id} className="testimonial-card">
              <span className="badge">{t.platform}</span>
              <h4>{t.title}</h4>

              {t.rating && (
                <div className="rating">
                  {"★".repeat(t.rating)}
                  {"☆".repeat(5 - t.rating)}
                </div>
              )}

              <p>{t.content}</p>

              {t.url && (
                <a href={t.url} target="_blank" rel="noreferrer">
                  View original
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
