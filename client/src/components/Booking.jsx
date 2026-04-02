import React, { useState, useEffect } from "react";

export default function Booking() {
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    style: ""
  });

  // Fetch existing bookings
  useEffect(() => {
    fetch("http://localhost:3000/bookings")
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(err => console.error("Error fetching bookings:", err));
  }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        setBookings([data, ...bookings]);
        setFormData({ name: "", email: "", date: "", style: "" });
      })
      .catch(err => console.error("Error posting booking:", err));
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
      <div style={{
        width: "100%",
        maxWidth: "500px",
        textAlign: "center"
      }}>
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
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #555",
              backgroundColor: "#222",
              color: "white"
            }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #555",
              backgroundColor: "#222",
              color: "white"
            }}
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #555",
              backgroundColor: "#222",
              color: "white"
            }}
          />
          <input
            type="text"
            name="style"
            placeholder="Tattoo Style / Idea"
            value={formData.style}
            onChange={handleChange}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #555",
              backgroundColor: "#222",
              color: "white"
            }}
          />
          <button type="submit" style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#ff0055",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer"
          }}>Book Appointment</button>
        </form>

        <h2>Existing Bookings</h2>
        {bookings.map(booking => (
          <div key={booking.id} style={{
            gap: "10px",
            marginBottom: "15px",
            padding: "15px",
            backgroundColor: "#111",
            borderRadius: "8px"
          }}>
            <strong>{booking.name}</strong> — {booking.date}
            <br />
            {booking.email} — {booking.style}
          </div>
        ))}
      </div>
    </div>
  );
}