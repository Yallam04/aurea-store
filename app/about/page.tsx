import Footer from "../Footer";

const values = [
  { num: "01", title: "Ethical Sourcing", desc: "Every gram of gold and silver is traceable to responsible mines. We choose suppliers who share our commitment to people and the planet." },
  { num: "02", title: "Master Craft", desc: "Our artisans train for years before touching a single piece. Each item is shaped, polished, and inspected by human hands — never a machine." },
  { num: "03", title: "Timeless Design", desc: "We don't chase trends. We design for the woman who will wear this ring at 30 and love it still at 70." },
  { num: "04", title: "Our Promise", desc: "Every Auréa piece comes with a lifetime care guarantee. We polish, repair, and restore — for free, forever." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          height: "70vh",
          background: "var(--charcoal)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated gold rings */}
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: `${200 + i * 120}px`,
              height: `${200 + i * 120}px`,
              borderRadius: "50%",
              border: `1px solid rgba(201,168,76,${0.15 - i * 0.03})`,
            }}
          />
        ))}

        <div style={{ position: "relative", zIndex: 1 }}>
          <span className="section-label">Our Story</span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(52px, 8vw, 96px)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--cream)",
              lineHeight: 1,
              marginBottom: "24px",
            }}
          >
            About Auréa
          </h1>
          <p
            style={{
              color: "var(--stone)",
              fontSize: "16px",
              maxWidth: "520px",
              margin: "0 auto",
              lineHeight: 1.9,
              fontWeight: 300,
            }}
          >
            Born in Cairo, shaped by tradition, and refined for the modern wearer.
          </p>
        </div>
      </section>

      {/* Gold divider */}
      <div style={{ height: "4px", background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />

      {/* Story section */}
      <section style={{ padding: "100px 60px", background: "var(--warm-white)" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "100px",
            alignItems: "center",
          }}
        >
          {/* Left: large decorative */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "480px",
              background: "var(--cream)",
            }}
          >
            <svg width="300" height="300" viewBox="0 0 300 300" style={{ opacity: 0.35 }}>
              <circle cx="150" cy="150" r="130" fill="none" stroke="#9E7C2E" strokeWidth="0.5" />
              <circle cx="150" cy="150" r="100" fill="none" stroke="#9E7C2E" strokeWidth="0.5" strokeDasharray="2 8" />
              <circle cx="150" cy="150" r="70" fill="none" stroke="#9E7C2E" strokeWidth="0.5" />
              <polygon points="150,60 220,110 220,190 150,240 80,190 80,110" fill="none" stroke="#9E7C2E" strokeWidth="0.5" />
            </svg>
            <div style={{ position: "absolute", textAlign: "center" }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "120px",
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "var(--gold)",
                  lineHeight: 1,
                  opacity: 0.25,
                }}
              >
                A
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "40px",
                left: "40px",
                borderLeft: "2px solid var(--gold)",
                paddingLeft: "20px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: "15px",
                  color: "var(--charcoal)",
                  lineHeight: 1.7,
                }}
              >
                "Gold does not rust. Neither does a well-crafted piece of jewelry."
              </p>
              <span style={{ fontSize: "11px", letterSpacing: "0.2em", color: "var(--stone)", display: "block", marginTop: "8px" }}>
                — FOUNDER, AURÉA
              </span>
            </div>
          </div>

          {/* Right: text */}
          <div>
            <span className="section-label">Since 2020</span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "44px",
                fontWeight: 300,
                fontStyle: "italic",
                color: "var(--charcoal)",
                lineHeight: 1.2,
                marginBottom: "24px",
              }}
            >
              Jewelry as a<br />love language
            </h2>
            <div className="gold-line" />
            <p style={{ color: "var(--stone)", fontSize: "15px", lineHeight: 1.9, marginBottom: "20px", fontWeight: 300 }}>
              Auréa was founded with one belief: that jewelry should mean something. Not just as an accessory, but as a memory you can touch, a story you can wear, a moment you carry with you always.
            </p>
            <p style={{ color: "var(--stone)", fontSize: "15px", lineHeight: 1.9, fontWeight: 300 }}>
              We started in a small Cairo studio, sketching designs on paper and casting them by hand. Today, our pieces travel across Egypt and beyond — but the process hasn't changed. Every ring, every chain, every pendant is still made the same careful way.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "32px",
                marginTop: "48px",
                textAlign: "center",
              }}
            >
              {[["4+", "Years"], ["42", "Pieces"], ["1K+", "Happy Clients"]].map(([num, label]) => (
                <div key={label}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "40px",
                      fontWeight: 300,
                      fontStyle: "italic",
                      color: "var(--gold)",
                      lineHeight: 1,
                    }}
                  >
                    {num}
                  </div>
                  <div style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--stone)", marginTop: "6px" }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: "var(--charcoal)", padding: "100px 60px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "70px" }}>
            <span className="section-label">What We Stand For</span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "52px",
                fontWeight: 300,
                fontStyle: "italic",
                color: "var(--cream)",
              }}
            >
              Our Values
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px" }}>
            {values.map(({ num, title, desc }) => (
              <div
                key={num}
                style={{
                  borderTop: "1px solid rgba(201,168,76,0.3)",
                  paddingTop: "32px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "40px",
                    fontWeight: 300,
                    fontStyle: "italic",
                    color: "var(--gold)",
                    opacity: 0.4,
                    display: "block",
                    marginBottom: "12px",
                  }}
                >
                  {num}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "26px",
                    fontWeight: 400,
                    fontStyle: "italic",
                    color: "var(--cream)",
                    marginBottom: "12px",
                  }}
                >
                  {title}
                </h3>
                <p style={{ color: "var(--stone)", fontSize: "14px", lineHeight: 1.8, fontWeight: 300 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          section div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
