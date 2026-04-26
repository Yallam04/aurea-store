"use client";
import { useState } from "react";
import Footer from "../Footer";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "16px 20px",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid var(--mist)",
    fontSize: "15px",
    fontFamily: "var(--font-body)",
    fontWeight: 300,
    color: "var(--charcoal)",
    outline: "none",
    transition: "border-color 0.3s",
  };

  return (
    <>
      {/* Hero */}
      <section
        style={{
          height: "45vh",
          background: "var(--cream)",
          display: "flex",
          alignItems: "flex-end",
          padding: "60px",
          borderBottom: "1px solid var(--mist)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", right: 0, bottom: 0, opacity: 0.1 }}>
          <svg width="400" height="300" viewBox="0 0 400 300">
            {[...Array(5)].map((_, i) => (
              <ellipse key={i} cx="380" cy="280" rx={40 + i * 60} ry={30 + i * 45} fill="none" stroke="#9E7C2E" strokeWidth="0.5" />
            ))}
          </svg>
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <span className="section-label">Get In Touch</span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(48px, 7vw, 80px)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--charcoal)",
              lineHeight: 1,
            }}
          >
            Contact Us
          </h1>
        </div>
      </section>

      {/* Contact body */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr",
          minHeight: "70vh",
        }}
      >
        {/* Left info */}
        <div
          style={{
            background: "var(--charcoal)",
            padding: "80px 60px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <span className="logo-aurea" style={{ fontSize: "36px", color: "var(--gold-light)", marginBottom: "8px", display: "block" }}>
              Auréa
            </span>
            <span className="logo-sub" style={{ marginBottom: "40px", display: "block" }}>Jewelry</span>

            <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
              {[
                { label: "Email", value: "hello@aureajewelry.com" },
                { label: "Phone", value: "+20 123 456 7890" },
                { label: "Location", value: "Cairo, Egypt" },
                { label: "Hours", value: "Mon–Sat · 10am – 7pm" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <span style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", display: "block", marginBottom: "8px", fontFamily: "var(--font-body)" }}>
                    {label}
                  </span>
                  <span style={{ fontSize: "15px", color: "var(--mist)", fontWeight: 300 }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(201,168,76,0.2)", paddingTop: "32px", marginTop: "40px" }}>
            <span style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", display: "block", marginBottom: "16px" }}>
              Follow Us
            </span>
            <div style={{ display: "flex", gap: "20px" }}>
              {["Instagram", "Pinterest", "TikTok"].map((s) => (
                <a
                  key={s}
                  href="#"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--stone)",
                    transition: "color 0.3s",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right form */}
        <div style={{ background: "var(--warm-white)", padding: "80px 60px" }}>
          {submitted ? (
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  border: "1px solid var(--gold)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "24px",
                  fontSize: "24px",
                  color: "var(--gold)",
                }}
              >
                ✓
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "36px",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "var(--charcoal)",
                  marginBottom: "16px",
                }}
              >
                Thank you, {form.name || "friend"}
              </h2>
              <p style={{ color: "var(--stone)", fontSize: "14px", lineHeight: 1.8 }}>
                We've received your message and will be in touch within 24 hours.
              </p>
            </div>
          ) : (
            <>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "36px",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "var(--charcoal)",
                  marginBottom: "8px",
                }}
              >
                Send us a message
              </h2>
              <p style={{ color: "var(--stone)", fontSize: "13px", marginBottom: "48px" }}>
                Whether you have a question or want a custom piece, we'd love to hear from you.
              </p>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
                  <div>
                    <label style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", display: "block", marginBottom: "8px" }}>
                      Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", display: "block", marginBottom: "8px" }}>
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", display: "block", marginBottom: "8px" }}>
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    style={{ ...inputStyle, cursor: "pointer" }}
                  >
                    <option value="">Select a topic</option>
                    <option>General Inquiry</option>
                    <option>Custom Design Request</option>
                    <option>Order Status</option>
                    <option>Repair & Care</option>
                    <option>Wholesale</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", display: "block", marginBottom: "8px" }}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us what's on your mind..."
                    required
                    rows={5}
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>

                <div>
                  <button type="submit" className="btn-gold">
                    Send Message
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          section[style*="grid-template-columns: 1fr 1.5fr"] {
            grid-template-columns: 1fr !important;
          }
        }
        input::placeholder, textarea::placeholder { color: #B0A898; }
        input:focus, textarea:focus, select:focus { border-bottom-color: var(--gold) !important; }
        select option { background: #fff; color: #2D2A25; }
      `}</style>
    </>
  );
}
