"use client";
import { useState } from "react";
import Footer from "../Footer";

const womenProducts = [
  { id: 1, name: "Luna Ring", material: "18k Gold", price: "EGP 4,200", bg: "#E8DDD0", accent: "#C9A84C" },
  { id: 2, name: "Celeste Necklace", material: "Sterling Silver", price: "EGP 3,100", bg: "#D8D0C8", accent: "#9E9E9E" },
  { id: 3, name: "Aurora Earrings", material: "18k Gold", price: "EGP 2,800", bg: "#E2D8CC", accent: "#C9A84C" },
  { id: 4, name: "Soleil Bracelet", material: "Gold & Silver", price: "EGP 5,600", bg: "#D0C8BC", accent: "#C9A84C" },
  { id: 5, name: "Iris Cuff", material: "Sterling Silver", price: "EGP 3,900", bg: "#DDD8D0", accent: "#9E9E9E" },
  { id: 6, name: "Nova Pendant", material: "18k Gold", price: "EGP 4,800", bg: "#E8E0D4", accent: "#C9A84C" },
  { id: 7, name: "Dune Earrings", material: "Sterling Silver", price: "EGP 2,200", bg: "#D4CEC4", accent: "#9E9E9E" },
  { id: 8, name: "Ember Ring", material: "18k Gold", price: "EGP 5,100", bg: "#EAE0D2", accent: "#C9A84C" },
  { id: 9, name: "Pearl Drop Necklace", material: "Gold & Pearl", price: "EGP 6,400", bg: "#E0D8CE", accent: "#C9A84C" },
  { id: 10, name: "Sable Bangle", material: "Sterling Silver", price: "EGP 3,300", bg: "#D8D2C8", accent: "#9E9E9E" },
];

function JewelSVG({ accent }: { accent: string }) {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" style={{ opacity: 0.7 }}>
      <polygon points="40,10 65,28 65,52 40,70 15,52 15,28" fill="none" stroke={accent} strokeWidth="1" />
      <circle cx="40" cy="40" r="10" fill={accent} opacity="0.3" />
      <circle cx="40" cy="40" r="5" fill={accent} opacity="0.6" />
    </svg>
  );
}

export default function WomenPage() {
  const [showAll, setShowAll] = useState(false);
  const visibleProducts = showAll ? womenProducts : womenProducts.slice(0, 5);

  return (
    <>
      {/* Page hero */}
      <section
        style={{
          height: "60vh",
          background: "linear-gradient(135deg, #E8E2D7 0%, #D6CDB8 100%)",
          display: "flex",
          alignItems: "flex-end",
          padding: "60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "10%",
            top: "50%",
            transform: "translateY(-50%)",
            opacity: 0.15,
          }}
        >
          <svg width="400" height="400" viewBox="0 0 400 400">
            <circle cx="200" cy="200" r="180" fill="none" stroke="#9E7C2E" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="140" fill="none" stroke="#9E7C2E" strokeWidth="0.5" strokeDasharray="3 9" />
            <circle cx="200" cy="200" r="100" fill="none" stroke="#9E7C2E" strokeWidth="0.5" />
          </svg>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <span className="section-label">Curated For Her</span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(56px, 8vw, 96px)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--charcoal)",
              lineHeight: 1,
            }}
          >
            Women
          </h1>
          <p
            style={{
              color: "var(--stone)",
              fontSize: "15px",
              maxWidth: "420px",
              marginTop: "16px",
              fontWeight: 300,
            }}
          >
            Pieces shaped by grace — from whisper-thin chains to sculptural rings that speak without words.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <div
        style={{
          background: "var(--warm-white)",
          padding: "20px 60px",
          borderBottom: "1px solid var(--mist)",
          display: "flex",
          gap: "32px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--stone)" }}>
          Filter:
        </span>
        {["All", "Gold", "Silver", "Rings", "Necklaces", "Earrings", "Bracelets"].map((f) => (
          <button
            key={f}
            style={{
              background: f === "All" ? "var(--charcoal)" : "none",
              color: f === "All" ? "#fff" : "var(--stone)",
              border: f === "All" ? "none" : "1px solid var(--mist)",
              padding: "6px 16px",
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              transition: "all 0.2s",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "3px",
          background: "var(--mist)",
        }}
      >
        {visibleProducts.map((p) => (
          <div key={p.id} className="product-card">
            <div
              className="product-img-placeholder"
              style={{ background: p.bg, aspectRatio: "3/4" }}
            >
              <div style={{ textAlign: "center" }}>
                <JewelSVG accent={p.accent} />
                <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: p.accent, opacity: 0.1, margin: "8px auto 0" }} />
              </div>
              <div className="product-overlay">
                <div className="product-overlay-content">
                  <h3>{p.name}</h3>
                  <p>{p.material} · {p.price}</p>
                </div>
              </div>
            </div>
            <div className="product-label">
              <h3>{p.name}</h3>
              <p>{p.material} · {p.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* View More / View Less */}
      <section
        style={{
          textAlign: "center",
          padding: "60px",
          background: "var(--cream)",
        }}
      >
        <p style={{ color: "var(--stone)", fontSize: "13px", letterSpacing: "0.1em", marginBottom: "24px" }}>
          Showing {visibleProducts.length} of {womenProducts.length} pieces
        </p>
        {!showAll ? (
          <button className="btn-outline" onClick={() => setShowAll(true)}>
            View More
          </button>
        ) : (
          <button className="btn-outline" onClick={() => setShowAll(false)}>
            View Less
          </button>
        )}
      </section>

      <Footer />

      <style>{`
        @media (max-width: 1024px) {
          div[style*="grid-template-columns: repeat(5, 1fr)"] {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          div[style*="grid-template-columns: repeat(5, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </>
  );
}
