import Footer from "../Footer";
import { sql } from '@/lib/db';
import ProductGrid from "./ProductGrid";

export default async function MenPage() {
  // Fetching the real data securely on the server
  const inventory = await sql`SELECT * FROM products WHERE category = 'Men' ORDER BY id ASC`;

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
        <div style={{ position: "absolute", right: "8%", top: "50%", transform: "translateY(-50%)", opacity: 0.12 }}>
          <svg width="400" height="400" viewBox="0 0 400 400">
            <rect x="60" y="60" width="280" height="280" fill="none" stroke="#C9A84C" strokeWidth="0.5" transform="rotate(45 200 200)" />
            <rect x="100" y="100" width="200" height="200" fill="none" stroke="#C9A84C" strokeWidth="0.5" strokeDasharray="4 8" transform="rotate(45 200 200)" />
            <rect x="140" y="140" width="120" height="120" fill="none" stroke="#C9A84C" strokeWidth="0.5" transform="rotate(45 200 200)" />
          </svg>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <span className="section-label">Crafted For Him</span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(56px, 8vw, 96px)", fontWeight: 300, fontStyle: "italic", color: "var(--cream)", lineHeight: 1 }}>
            Men
          </h1>
          <p style={{ color: "var(--stone)", fontSize: "15px", maxWidth: "420px", marginTop: "16px", fontWeight: 300 }}>
            Bold lines, refined metals. Jewelry that carries weight — both literally and in the story it tells.
          </p>
        </div>
      </section>

      {/* --- INJECTING YOUR NEW COMPONENT --- */}
      <ProductGrid inventory={inventory} />

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