"use client";
import { useState } from "react";
import Footer from "../Footer";

const menProducts = [
  { id: 1, name: "Atlas Chain", material: "Sterling Silver", price: "EGP 5,800", bg: "#2D2A25" },
  { id: 2, name: "Obsidian Ring", material: "18k Gold", price: "EGP 6,200", bg: "#3E3A33" },
  { id: 3, name: "Forge Bracelet", material: "Sterling Silver", price: "EGP 4,500", bg: "#1E1C1A" },
  { id: 4, name: "Summit Cuff", material: "18k Gold", price: "EGP 7,800", bg: "#2A2620" },
  { id: 5, name: "Ridge Pendant", material: "Sterling Silver", price: "EGP 3,200", bg: "#343028" },
  { id: 6, name: "Dusk Signet", material: "Gold & Silver", price: "EGP 8,400", bg: "#241F18" },
  { id: 7, name: "Iron Cross Ring", material: "Sterling Silver", price: "EGP 4,100", bg: "#2E2B26" },
  { id: 8, name: "Onyx Bracelet", material: "18k Gold", price: "EGP 6,900", bg: "#383430" },
  { id: 9, name: "Midnight Chain", material: "Sterling Silver", price: "EGP 5,200", bg: "#1A1814" },
  { id: 10, name: "Titan Cuff", material: "Gold & Silver", price: "EGP 9,100", bg: "#302C24" },
];

function ChainSVG() {
  return (
    <svg width="100" height="40" viewBox="0 0 100 40">
      {[0, 28, 56].map((x) => (
        <ellipse key={x} cx={x + 18} cy="20" rx="14" ry="8" fill="none" stroke="#C9A84C" strokeWidth="2" />
      ))}
    </svg>
  );
}

export default function MenPage() {
  const [showAll, setShowAll] = useState(false);
  const visibleProducts = showAll ? menProducts : menProducts.slice(0, 5);

  return (
    <>
      {/* Page hero */}
      <section
        style={{
          height: "60vh",
          background: "linear-gradient(135deg, #1E1C1A 0%, #2D2A25 50%, #3E3A33 100%)",
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
            right: "8%",
            top: "50%",
            transform: "translateY(-50%)",
            opacity: 0.12,
          }}
        >
          <svg width="400" height="400" viewBox="0 0 400 400">
            <rect x="60" y="60" width="280" height="280" fill="none" stroke="#C9A84C" strokeWidth="0.5" transform="rotate(45 200 200)" />
            <rect x="100" y="100" width="200" height="200" fill="none" stroke="#C9A84C" strokeWidth="0.5" strokeDasharray="4 8" transform="rotate(45 200 200)" />
            <rect x="140" y="140" width="120" height="120" fill="none" stroke="#C9A84C" strokeWidth="0.5" transform="rotate(45 200 200)" />
          </svg>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <span className="section-label">Crafted For Him</span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(56px, 8vw, 96px)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--cream)",
              lineHeight: 1,
            }}
          >
            Men
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
            Bold lines, refined metals. Jewelry that carries weight — both literally and in the story it tells.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <div
        style={{
          background: "var(--charcoal)",
          padding: "20px 60px",
          borderBottom: "1px solid rgba(201,168,76,0.15)",
          display: "flex",
          gap: "32px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--stone)" }}>
          Filter:
        </span>
        {["All", "Gold", "Silver", "Chains", "Rings", "Bracelets", "Pendants"].map((f) => (
          <button
            key={f}
            style={{
              background: f === "All" ? "var(--gold)" : "none",
              color: f === "All" ? "var(--charcoal)" : "var(--stone)",
              border: f === "All" ? "none" : "1px solid rgba(201,168,76,0.2)",
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
          background: "#111",
        }}
      >
        {visibleProducts.map((p) => (
          <div key={p.id} className="product-card" style={{ background: p.bg }}>
            <div
              className="product-img-placeholder"
              style={{ background: p.bg, aspectRatio: "3/4" }}
            >
              <div style={{ textAlign: "center" }}>
                <ChainSVG />
                <div style={{ width: "40px", height: "2px", background: "var(--gold)", margin: "16px auto", opacity: 0.6 }} />
                <div style={{ width: "30px", height: "30px", border: "1px solid var(--gold)", transform: "rotate(45deg)", opacity: 0.4 }} />
              </div>
              <div className="product-overlay">
                <div className="product-overlay-content">
                  <h3>{p.name}</h3>
                  <p>{p.material} · {p.price}</p>
                </div>
              </div>
            </div>
            <div className="product-label" style={{ background: p.bg }}>
              <h3 style={{ color: "var(--cream)" }}>{p.name}</h3>
              <p style={{ color: "var(--gold)" }}>{p.material} · {p.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* View More / View Less */}
      <section
        style={{
          textAlign: "center",
          padding: "60px",
          background: "var(--charcoal)",
        }}
      >
        <p style={{ color: "var(--stone)", fontSize: "13px", letterSpacing: "0.1em", marginBottom: "24px" }}>
          Showing {visibleProducts.length} of {menProducts.length} pieces
        </p>
        {!showAll ? (
          <button className="btn-outline-light" onClick={() => setShowAll(true)}>
            View More
          </button>
        ) : (
          <button className="btn-outline-light" onClick={() => setShowAll(false)}>
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
