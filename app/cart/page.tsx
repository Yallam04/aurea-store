import Link from "next/link";
import Footer from "../Footer";

const cartItems = [
  { id: 1, name: "Luna Ring", material: "18k Gold", price: 4200, qty: 1, bg: "#E8DDD0", accent: "#C9A84C" },
  { id: 2, name: "Celeste Necklace", material: "Sterling Silver", price: 3100, qty: 2, bg: "#D8D0C8", accent: "#9E9E9E" },
  { id: 3, name: "Atlas Chain", material: "Sterling Silver", price: 5800, qty: 1, bg: "#2D2A25", accent: "#C9A84C" },
];

const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

function JewelIcon({ accent }: { accent: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48">
      <polygon points="24,6 42,18 42,30 24,42 6,30 6,18" fill="none" stroke={accent} strokeWidth="1" />
      <circle cx="24" cy="24" r="6" fill={accent} opacity="0.3" />
    </svg>
  );
}

export default function CartPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          height: "35vh",
          background: "var(--charcoal)",
          display: "flex",
          alignItems: "flex-end",
          padding: "60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", right: "60px", top: "50%", transform: "translateY(-50%)", opacity: 0.08 }}>
          <svg width="300" height="300" viewBox="0 0 300 300">
            {[...Array(4)].map((_, i) => (
              <circle key={i} cx="150" cy="150" r={50 + i * 40} fill="none" stroke="#C9A84C" strokeWidth="0.5" />
            ))}
          </svg>
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <span className="section-label">Your Selection</span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(48px, 7vw, 80px)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--cream)",
              lineHeight: 1,
            }}
          >
            Your Cart
          </h1>
        </div>
      </section>

      {/* Cart body */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr",
          minHeight: "60vh",
          background: "var(--warm-white)",
        }}
      >
        {/* Items */}
        <div style={{ padding: "60px", borderRight: "1px solid var(--mist)" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "40px",
              paddingBottom: "20px",
              borderBottom: "1px solid var(--mist)",
            }}
          >
            <span style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--stone)" }}>
              {cartItems.length} Items
            </span>
            <button
              style={{
                background: "none",
                border: "none",
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--stone)",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                textDecoration: "underline",
              }}
            >
              Clear All
            </button>
          </div>

          {/* Cart items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px 1fr auto",
                  gap: "28px",
                  alignItems: "center",
                  paddingBottom: "32px",
                  borderBottom: "1px solid var(--mist)",
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    background: item.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <JewelIcon accent={item.accent} />
                </div>

                {/* Info */}
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "22px",
                      fontWeight: 400,
                      fontStyle: "italic",
                      color: "var(--charcoal)",
                      marginBottom: "4px",
                    }}
                  >
                    {item.name}
                  </h3>
                  <p style={{ fontSize: "12px", color: "var(--stone)", letterSpacing: "0.1em", marginBottom: "16px" }}>
                    {item.material}
                  </p>

                  {/* Qty controls */}
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid var(--mist)",
                        width: "fit-content",
                      }}
                    >
                      <button
                        style={{
                          width: "32px",
                          height: "32px",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "16px",
                          color: "var(--stone)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        −
                      </button>
                      <span
                        style={{
                          width: "32px",
                          textAlign: "center",
                          fontSize: "14px",
                          color: "var(--charcoal)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        {item.qty}
                      </span>
                      <button
                        style={{
                          width: "32px",
                          height: "32px",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "16px",
                          color: "var(--stone)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        +
                      </button>
                    </div>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        fontSize: "11px",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "var(--stone)",
                        cursor: "pointer",
                        fontFamily: "var(--font-body)",
                        textDecoration: "underline",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div style={{ textAlign: "right" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "22px",
                      fontWeight: 400,
                      fontStyle: "italic",
                      color: "var(--charcoal)",
                    }}
                  >
                    EGP {(item.price * item.qty).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "40px" }}>
            <Link
              href="/collections"
              style={{
                fontSize: "12px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--stone)",
                fontFamily: "var(--font-body)",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order summary */}
        <div style={{ padding: "60px", background: "var(--cream)" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "28px",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--charcoal)",
              marginBottom: "40px",
            }}
          >
            Order Summary
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
            {cartItems.map((item) => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "13px", color: "var(--stone)", fontWeight: 300 }}>
                  {item.name} × {item.qty}
                </span>
                <span style={{ fontSize: "13px", color: "var(--charcoal)" }}>
                  EGP {(item.price * item.qty).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid var(--mist)", paddingTop: "20px", marginBottom: "12px", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "13px", color: "var(--stone)" }}>Subtotal</span>
            <span style={{ fontSize: "13px", color: "var(--charcoal)" }}>EGP {subtotal.toLocaleString()}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
            <span style={{ fontSize: "13px", color: "var(--stone)" }}>Shipping</span>
            <span style={{ fontSize: "13px", color: "var(--gold-dark)" }}>Free</span>
          </div>
          <div style={{ borderTop: "1px solid var(--mist)", paddingTop: "20px", marginBottom: "40px", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "15px", fontWeight: 400, color: "var(--charcoal)", letterSpacing: "0.05em" }}>Total</span>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "24px",
                fontWeight: 400,
                fontStyle: "italic",
                color: "var(--charcoal)",
              }}
            >
              EGP {subtotal.toLocaleString()}
            </span>
          </div>

          {/* Promo code */}
          <div style={{ marginBottom: "32px" }}>
            <label style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", display: "block", marginBottom: "10px" }}>
              Promo Code
            </label>
            <div style={{ display: "flex", gap: "0" }}>
              <input
                type="text"
                placeholder="Enter code"
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  background: "transparent",
                  border: "1px solid var(--mist)",
                  borderRight: "none",
                  fontSize: "13px",
                  fontFamily: "var(--font-body)",
                  color: "var(--charcoal)",
                  outline: "none",
                }}
              />
              <button
                style={{
                  padding: "12px 20px",
                  background: "var(--charcoal)",
                  color: "#fff",
                  border: "none",
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                }}
              >
                Apply
              </button>
            </div>
          </div>

          <button className="btn-gold" style={{ width: "100%", textAlign: "center", padding: "18px" }}>
            Proceed to Checkout
          </button>

          <div
            style={{
              marginTop: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="2" y="6" width="10" height="7" rx="1" stroke="#8A8478" strokeWidth="1" />
              <path d="M4 6V4a3 3 0 016 0v2" stroke="#8A8478" strokeWidth="1" />
            </svg>
            <span style={{ fontSize: "11px", color: "var(--stone)", letterSpacing: "0.1em" }}>
              Secure checkout · SSL encrypted
            </span>
          </div>

          {/* Payment icons */}
          <div style={{ marginTop: "20px", display: "flex", gap: "8px", justifyContent: "center" }}>
            {["VISA", "MC", "PayPal", "Apple Pay"].map((p) => (
              <div
                key={p}
                style={{
                  padding: "4px 10px",
                  border: "1px solid var(--mist)",
                  fontSize: "9px",
                  letterSpacing: "0.1em",
                  color: "var(--stone)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          section[style*="grid-template-columns: 1.6fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
        input::placeholder { color: #B0A898; }
      `}</style>
    </>
  );
}
