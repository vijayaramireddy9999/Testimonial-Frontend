import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyTestimonials from "./pages/MyTestimonials";

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <>

<nav className="navbar">
  <div className="nav-left">
    <span className="logo">Vijay’s <b>Testimonials</b></span>

    <div className="nav-links">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      {user && <Link to="/my-testimonials">My Testimonials</Link>}
    </div>
  </div>

  <div className="nav-right">
    {user ? (
      <>
        <span className="username">Hi, {user.name}</span>
        <button onClick={logoutHandler}>Logout</button>
      </>
    ) : (
      <>
        <button
          className="secondary"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          style={{ marginLeft: "10px" }}
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </>
    )}
  </div>
</nav>



      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route
            path="/my-testimonials"
            element={<MyTestimonials user={user} />}
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
