import Link from "next/link";
import Footer from "../Footer";

const collections = [
  {
    name: "Lumière",
    subtitle: "Gold Radiance Collection",
    desc: "Inspired by the first light of dawn — warm, soft, and endlessly luminous. Each piece catches light like morning sun.",
    pieces: 12,
    metal: "18k Gold",
    bg: "#C9A84C",
    textColor: "#2D2A25",
    link: "/women",
  },
  {
    name: "Argent",
    subtitle: "Silver Essentials",
    desc: "Pure, precise, and ageless. Clean silver pieces with timeless structure.",
    pieces: 9,
    metal: "925 Silver",
    bg: "#8A8A92",
    textColor: "#F5F0E8",
    link: "/women",
  },
  {
    name: "Solstice",
    subtitle: "Summer Limited Edition",
    desc: "Warm, glowing pieces made for movement under the sun.",
    pieces: 6,
    metal: "Gold & Silver",
    bg: "#2D2A25",
    textColor: "#E2C97E",
    link: "/men",
  },
  {
    name: "Minimaliste",
    subtitle: "Everyday Elegance",
    desc: "Simple, soft, wearable jewelry for daily life.",
    pieces: 15,
    metal: "18k Gold",
    bg: "#E8E2D7",
    textColor: "#2D2A25",
    link: "/women",
  },
];

export default function CollectionsPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          height: "50vh",
          background: "var(--charcoal)",
          display: "flex",
          alignItems: "flex-end",
          padding: "60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "relative", zIndex: 1 }}>
          <span className="section-label">All Pieces</span>
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
            Our Collections
          </h1>
        </div>
      </section>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3px",
          background: "#ccc",
        }}
      >
        {collections.map((col) => (
          <div
            key={col.name}
            style={{
              background: col.bg,
              padding: "80px 60px",
              position: "relative",
              minHeight: "400px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <div style={{ position: "relative", zIndex: 1 }}>
              <span
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: col.textColor,
                  opacity: 0.6,
                }}
              >
                {col.metal}
              </span>

              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "56px",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: col.textColor,
                  marginBottom: "16px",
                }}
              >
                {col.name}
              </h2>

              <p
                style={{
                  fontSize: "13px",
                  color: col.textColor,
                  opacity: 0.7,
                  maxWidth: "340px",
                  marginBottom: "24px",
                }}
              >
                {col.desc}
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: col.textColor,
                  }}
                >
                  {col.pieces} pieces
                </span>

                <div
                  style={{
                    width: "40px",
                    height: "1px",
                    background: col.textColor,
                    opacity: 0.4,
                  }}
                />

                {/* ✅ ONLY CHANGE: LINK */}
                <Link href={col.link} style={{ textDecoration: "none" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: col.textColor,
                      cursor: "pointer",
                    }}
                  >
                    View →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}