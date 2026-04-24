import React, { useState, useEffect } from "react";

export default function Booking() {
  const API = import.meta.env.VITE_API_BASE_URL;

  const [bookings, setBookings] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    style: ""
  });

  // READ
  useEffect(() => {
    fetch(`${API}/bookings`)
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(err => console.error("Error fetching bookings:", err));
  }, [API]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // CREATE + UPDATE
  function handleSubmit(e) {
    e.preventDefault();

    const url = editingId
      ? `${API}/bookings/${editingId}`
      : `${API}/bookings`;

    const method = editingId ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        if (editingId) {
          setBookings(
            bookings.map(b => (b.id === editingId ? data : b))
          );
          setEditingId(null);
        } else {
          setBookings([data, ...bookings]);
        }

        setFormData({ name: "", email: "", date: "", style: "" });
      })
      .catch(err => console.error("Error posting booking:", err));
  }

  // DELETE (FIXED)
  function handleDelete(id) {
    fetch(`${API}/bookings/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(() => {
        setBookings(bookings.filter(b => b.id !== id));
      })
      .catch(err => console.error("Error deleting booking:", err));
  }

  // EDIT
  function handleEdit(booking) {
    setFormData({
      name: booking.name,
      email: booking.email,
      date: booking.date,
      style: booking.style
    });

    setEditingId(booking.id);
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "black",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      color: "white"
    }}>
      <div style={{ width: "100%", maxWidth: "500px", textAlign: "center" }}>
        <h1>Book Your Tattoo Appointment</h1>

        <form onSubmit={handleSubmit} style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginBottom: "40px"
        }}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ padding: "10px", backgroundColor: "#222", color: "white" }}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ padding: "10px", backgroundColor: "#222", color: "white" }}
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            style={{ padding: "10px", backgroundColor: "#222", color: "white" }}
          />

          <input
            type="text"
            name="style"
            placeholder="Tattoo Style / Idea"
            value={formData.style}
            onChange={handleChange}
            style={{ padding: "10px", backgroundColor: "#222", color: "white" }}
          />

          <button type="submit" style={{
            padding: "12px",
            backgroundColor: editingId ? "orange" : "#ff0055",
            color: "white",
            border: "none"
          }}>
            {editingId ? "Update Appointment" : "Book Appointment"}
          </button>
        </form>

        <h2>Existing Bookings</h2>

        {bookings.map(booking => (
          <div key={booking.id} style={{
            marginBottom: "15px",
            padding: "15px",
            backgroundColor: "#111"
          }}>
            <strong>{booking.name}</strong> — {booking.date}
            <br />
            {booking.email} — {booking.style}

            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() => handleEdit(booking)}
                style={{
                  marginRight: "10px",
                  backgroundColor: "orange",
                  padding: "6px"
                }}
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(booking.id)}
                style={{
                  backgroundColor: "red",
                  padding: "6px",
                  color: "white"
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}