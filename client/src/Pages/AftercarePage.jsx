import React from "react";
import "../styles/aftercare.css";

export default function Aftercare() {
  return (
    <div className="page">
      <div className="container">
        <h1 className="title">Tattoo Aftercare Guide</h1>

        <p className="subtitle">
          Follow these steps to ensure your tattoo heals properly and stays bold.
        </p>

        <img
          src="https://images.unsplash.com/photo-1547045662-8f3b0c7b3b0c"
          alt="Tattoo care"
          className="image"
        />

        <section className="section">
          <h2>First 24 Hours</h2>
          <ul>
            <li>Keep the bandage on for 2–4 hours.</li>
            <li>Wash gently with lukewarm water and mild soap.</li>
            <li>Pat dry with a clean towel.</li>
          </ul>
        </section>

        <img
          src="https://images.unsplash.com/photo-1598373182133-52452f7691ef"
          alt="Cleaning tattoo"
          className="image"
        />

        <section className="section">
          <h2>Daily Care</h2>
          <ul>
            <li>Wash your tattoo 2–3 times daily.</li>
            <li>Apply a thin layer of fragrance-free moisturizer.</li>
            <li>Avoid scratching or picking at scabs.</li>
          </ul>
        </section>

        <img
          src="https://images.unsplash.com/photo-1517841905240-472988babdf9"
          alt="Tattoo healing"
          className="image"
        />

        <section className="section">
          <h2>Things to Avoid</h2>
          <ul>
            <li>Direct sunlight</li>
            <li>Swimming or soaking</li>
            <li>Tight clothing over the tattoo</li>
          </ul>
        </section>

        <section className="section">
          <h2>Healing Time</h2>
          <p>
            Most tattoos heal within 2–4 weeks, but full healing may take longer depending on size and placement.
          </p>
        </section>
      </div>
    </div>
  );
}