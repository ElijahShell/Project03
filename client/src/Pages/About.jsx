// About.jsx
import React from "react";
import "../styles/about.css";

export default function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1 className="about-title">Wolfe's Tattoo Gallery</h1>

        <p className="about-intro">
          At Wolfe's Tattoo Gallery, we believe tattoos are more than just ink —
          they are stories, identity, and art that lasts a lifetime.
        </p>

        <img
          src="/Tattoo_Artist.jpg"
          alt="Tattoo artist working"
          className="about-image"
        />

        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded with a passion for creativity and precision, Wolfe's Tattoo
            Gallery has become a place where artistry meets individuality. Our
            artists specialize in a wide range of styles, from bold traditional
            pieces to detailed realism and modern designs.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            We are dedicated to providing a clean, safe, and welcoming
            environment where clients can bring their ideas to life. Every piece
            we create is crafted with care, ensuring you leave with something
            meaningful and unique.
          </p>
        </section>

        <section className="about-section">
          <h2>Why Choose Us</h2>
          <ul>
            <li>Experienced and talented artists</li>
            <li>Custom designs tailored to you</li>
            <li>Clean and professional environment</li>
            <li>Focus on safety and aftercare</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Visit Us</h2>
          <p>
            Located in Knoxville, Tennessee, Wolfe's Tattoo Gallery welcomes
            walk-ins and appointments. Come by and let’s create something
            unforgettable.
          </p>
        </section>
      </div>
    </div>
  );
}


