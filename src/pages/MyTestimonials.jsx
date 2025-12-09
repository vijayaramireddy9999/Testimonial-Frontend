// frontend/src/pages/MyTestimonials.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const emptyForm = {
  platform: "",
  title: "",
  rating: "",
  url: "",
  content: "",
  isPublic: true
};

const MyTestimonials = ({ user }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchMyTestimonials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchMyTestimonials = async () => {
    try {
      const res = await API.get("/testimonials/my");
      setTestimonials(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load testimonials");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editingId) {
        await API.put(`/testimonials/${editingId}`, form);
      } else {
        await API.post("/testimonials", form);
      }
      setForm(emptyForm);
      setEditingId(null);
      fetchMyTestimonials();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Save failed");
    }
  };

  const handleEdit = (t) => {
    setEditingId(t._id);
    setForm({
      platform: t.platform,
      title: t.title,
      rating: t.rating || "",
      url: t.url || "",
      content: t.content,
      isPublic: t.isPublic
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      await API.delete(`/testimonials/${id}`);
      fetchMyTestimonials();
    } catch (err) {
      console.error(err);
      setError("Delete failed");
    }
  };

  return (
    <div>
      <h1>My Testimonials</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <h2>{editingId ? "Edit testimonial" : "Add new testimonial"}</h2>

        <div style={{ marginBottom: 8 }}>
          <label>Platform (Google, Swiggy, etc.)</label>
          <br />
          <input
            name="platform"
            value={form.platform}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>Title</label>
          <br />
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>Rating (1–5)</label>
          <br />
          <input
            name="rating"
            type="number"
            min="1"
            max="5"
            value={form.rating}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>Original URL (optional)</label>
          <br />
          <input
            name="url"
            value={form.url}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>Content</label>
          <br />
          <textarea
            name="content"
            rows="4"
            value={form.content}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>
            <input
              type="checkbox"
              name="isPublic"
              checked={form.isPublic}
              onChange={handleChange}
            />{" "}
            Make public
          </label>
        </div>

        <button type="submit">
          {editingId ? "Update" : "Create"}
        </button>
        {editingId && (
          <button
            type="button"
            style={{ marginLeft: 10 }}
            onClick={() => {
              setEditingId(null);
              setForm(emptyForm);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <h2>All my testimonials</h2>
      {testimonials.length === 0 && <p>No testimonials yet.</p>}
      <ul>
        {testimonials.map((t) => (
          <li key={t._id} style={{ marginBottom: 10 }}>
            <strong>{t.title}</strong> ({t.platform}){" "}
            {t.rating ? `⭐ ${t.rating}` : ""}
            <br />
            {t.content}
            <br />
            {t.url && (
              <a href={t.url} target="_blank" rel="noreferrer">
                View original
              </a>
            )}
            <br />
            <small>
              Public: {t.isPublic ? "Yes" : "No"} | Created at:{" "}
              {new Date(t.createdAt).toLocaleString()}
            </small>
            <br />
            <button onClick={() => handleEdit(t)}>Edit</button>
            <button
              style={{ marginLeft: 5 }}
              onClick={() => handleDelete(t._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyTestimonials;
