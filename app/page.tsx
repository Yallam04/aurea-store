"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Footer from "./Footer";

const heroWords = ["Timeless.", "Refined.", "Yours."];

export default function Home() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % heroWords.length);
        setVisible(true);
      }, 400);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ===== HERO ===== */}
      <section
        ref={heroRef}
        style={{
          height: "100vh",
          background: "var(--charcoal)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated background rings */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: `${280 + i * 180}px`,
              height: `${280 + i * 180}px`,
              borderRadius: "50%",
              border: `1px solid rgba(201,168,76,${0.12 - i * 0.03})`,
              animation: `spin ${18 + i * 8}s linear infinite ${i % 2 === 0 ? "reverse" : ""}`,
              transform: `rotate(${i * 30}deg)`,
            }}
          />
        ))}

        {/* Parallax gold line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: `translateX(-50%) translateY(${scrollY * 0.3}px)`,
            width: "1px",
            height: "120px",
            background: "linear-gradient(to bottom, transparent, var(--gold), transparent)",
            opacity: 0.6,
          }}
        />

        {/* Center content */}
        <div
          style={{
            textAlign: "center",
            zIndex: 2,
            padding: "0 24px",
            transform: `translateY(${scrollY * -0.15}px)`,
            transition: "transform 0.05s linear",
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: "10px",
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "32px",
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              animation: "fadeUp 1s 0.2s both ease",
            }}
          >
            Gold & Silver Jewelry
          </span>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(64px, 10vw, 120px)",
              color: "#F5F0E8",
              lineHeight: 1,
              letterSpacing: "0.02em",
              animation: "fadeUp 1s 0.4s both ease",
              fontStyle: "italic",
            }}
          >
            Auréa
          </h1>

          <div
            style={{
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "8px",
              animation: "fadeUp 1s 0.6s both ease",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 300,
                color: "var(--gold-light)",
                fontStyle: "italic",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 0.4s ease, transform 0.4s ease",
              }}
            >
              {heroWords[wordIndex]}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              marginTop: "48px",
              animation: "fadeUp 1s 0.8s both ease",
            }}
          >
            <Link href="/women" className="btn-outline-light">
              Women
            </Link>
            <Link href="/men" className="btn-outline-light">
              Men
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            animation: "fadeIn 1s 1.4s both ease",
          }}
        >
          <span
            style={{
              fontSize: "9px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--stone)",
              fontFamily: "var(--font-body)",
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: "1px",
              height: "40px",
              background: "var(--gold)",
              opacity: 0.5,
              animation: "pulseHeight 2s ease-in-out infinite",
            }}
          />
        </div>
      </section>

      {/* ===== MARQUEE STRIP ===== */}
      <div
        style={{
          background: "var(--gold)",
          padding: "14px 0",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <div style={{ display: "inline-block", animation: "marquee 18s linear infinite" }}>
          {Array(6)
            .fill(null)
            .map((_, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "13px",
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "var(--charcoal)",
                  letterSpacing: "0.1em",
                  margin: "0 40px",
                }}
              >
                Gold ✦ Silver ✦ Handcrafted ✦ Timeless
              </span>
            ))}
        </div>
      </div>

      {/* ===== EDITORIAL SPLIT ===== */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "90vh",
        }}
      >
        {/* Women side */}
        <Link
          href="/women"
          style={{
            position: "relative",
            overflow: "hidden",
            display: "block",
            background: "#E8E2D7",
          }}
        >
          <div
            style={{
              height: "90vh",
              background: "linear-gradient(135deg, #C4B99A 0%, #E8E2D7 60%, #D6CDB8 100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              transition: "transform 0.8s ease",
            }}
            className="split-hover"
          >
            {/* Decorative ring */}
            <svg
              width="240"
              height="240"
              viewBox="0 0 240 240"
              style={{ position: "absolute", opacity: 0.25 }}
            >
              <circle cx="120" cy="120" r="100" fill="none" stroke="#9E7C2E" strokeWidth="0.5" />
              <circle cx="120" cy="120" r="80" fill="none" stroke="#9E7C2E" strokeWidth="0.5" strokeDasharray="4 8" />
            </svg>

            {/* Jewel icon */}
            <svg width="64" height="64" viewBox="0 0 64 64" style={{ marginBottom: "24px" }}>
              <polygon
                points="32,8 56,24 56,40 32,56 8,40 8,24"
                fill="none"
                stroke="#C9A84C"
                strokeWidth="1"
              />
              <polygon
                points="32,16 48,26 48,38 32,48 16,38 16,26"
                fill="rgba(201,168,76,0.15)"
                stroke="#C9A84C"
                strokeWidth="0.5"
              />
            </svg>

            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "10px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "var(--gold-dark)",
                marginBottom: "16px",
                fontWeight: 300,
              }}
            >
              Collection
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "64px",
                fontWeight: 300,
                color: "var(--charcoal)",
                fontStyle: "italic",
                lineHeight: 1,
              }}
            >
              Women
            </h2>
            <div
              style={{
                width: "40px",
                height: "1px",
                background: "var(--gold)",
                margin: "20px auto",
              }}
            />
            <span
              style={{
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--stone)",
                fontFamily: "var(--font-body)",
              }}
            >
              Explore →
            </span>
          </div>
        </Link>

        {/* Men side */}
        <Link
          href="/men"
          style={{
            position: "relative",
            overflow: "hidden",
            display: "block",
          }}
        >
          <div
            style={{
              height: "90vh",
              background: "linear-gradient(135deg, #2D2A25 0%, #3E3A33 60%, #1E1C1A 100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* Decorative diamond */}
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              style={{ position: "absolute", opacity: 0.2 }}
            >
              <rect
                x="40"
                y="40"
                width="120"
                height="120"
                fill="none"
                stroke="#C9A84C"
                strokeWidth="0.5"
                transform="rotate(45 100 100)"
              />
              <rect
                x="60"
                y="60"
                width="80"
                height="80"
                fill="none"
                stroke="#C9A84C"
                strokeWidth="0.5"
                transform="rotate(45 100 100)"
                strokeDasharray="4 6"
              />
            </svg>

            {/* Chain icon */}
            <svg width="64" height="32" viewBox="0 0 64 32" style={{ marginBottom: "24px" }}>
              {[0, 20, 40].map((x) => (
                <ellipse
                  key={x}
                  cx={x + 12}
                  cy="16"
                  rx="10"
                  ry="6"
                  fill="none"
                  stroke="#C9A84C"
                  strokeWidth="1.5"
                />
              ))}
            </svg>

            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "10px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "16px",
                fontWeight: 300,
              }}
            >
              Collection
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "64px",
                fontWeight: 300,
                color: "var(--cream)",
                fontStyle: "italic",
                lineHeight: 1,
              }}
            >
              Men
            </h2>
            <div
              style={{
                width: "40px",
                height: "1px",
                background: "var(--gold)",
                margin: "20px auto",
              }}
            />
            <span
              style={{
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold-light)",
                fontFamily: "var(--font-body)",
              }}
            >
              Explore →
            </span>
          </div>
        </Link>
      </section>

      {/* ===== FEATURE STRIP ===== */}
      <section
        style={{
          background: "var(--cream)",
          padding: "80px 60px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "60px",
            textAlign: "center",
          }}
        >
          {[
            { icon: "✦", title: "Pure Materials", desc: "18k gold and 925 sterling silver, ethically sourced from certified suppliers." },
            { icon: "◈", title: "Handcrafted", desc: "Each piece shaped by skilled artisans who put care into every detail." },
            { icon: "⬡", title: "Lifetime Care", desc: "Free polishing and maintenance for the lifetime of your Auréa piece." },
          ].map(({ icon, title, desc }) => (
            <div key={title}>
              <div
                style={{
                  fontSize: "24px",
                  color: "var(--gold)",
                  marginBottom: "20px",
                  fontFamily: "var(--font-display)",
                }}
              >
                {icon}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "22px",
                  fontWeight: 400,
                  fontStyle: "italic",
                  marginBottom: "12px",
                  color: "var(--charcoal)",
                }}
              >
                {title}
              </h3>
              <p style={{ fontSize: "14px", color: "var(--stone)", lineHeight: 1.8, fontWeight: 300 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA BAND ===== */}
      <section
        style={{
          background: "var(--charcoal)",
          padding: "100px 60px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, opacity: 0.04 }}>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: "200px",
                height: "200px",
                border: "1px solid var(--gold)",
                borderRadius: "50%",
                left: `${(i % 4) * 25}%`,
                top: i < 4 ? "-40px" : "auto",
                bottom: i >= 4 ? "-40px" : "auto",
              }}
            />
          ))}
        </div>
        <span className="section-label">Our Collections</span>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "var(--cream)",
            marginBottom: "24px",
          }}
        >
          Discover Your Signature Piece
        </h2>
        <p
          style={{
            color: "var(--stone)",
            fontSize: "15px",
            maxWidth: "480px",
            margin: "0 auto 40px",
            lineHeight: 1.8,
            fontWeight: 300,
          }}
        >
          From delicate gold chains to bold silver cuffs, every piece in our collection is made to be worn, loved, and remembered.
        </p>
        <Link href="/collections" className="btn-gold">
          View All Collections
        </Link>
      </section>

      <Footer />

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulseHeight {
          0%, 100% { transform: scaleY(1); opacity: 0.5; }
          50% { transform: scaleY(1.4); opacity: 1; }
        }
        .split-hover:hover { transform: scale(1.02); }
        @media (max-width: 768px) {
          section[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}

