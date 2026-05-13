import Footer from "../Footer";
import { sql } from '@/lib/db';
import ProductGrid from "./ProductGrid";

export default async function WomenPage() {
  // Fetching the real data securely on the server
  const inventory = await sql`SELECT * FROM products WHERE category = 'Women' ORDER BY id ASC`;

  return (
    <>
      {/* Page hero (Light Mode styling based on your design) */}
      <section
        style={{
          height: "60vh",
          background: "linear-gradient(135deg, #F5F0E8 0%, #E8E2D7 100%)",
          display: "flex",
          alignItems: "flex-end",
          padding: "60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", right: "8%", top: "50%", transform: "translateY(-50%)", opacity: 0.15 }}>
          <svg width="400" height="400" viewBox="0 0 400 400">
            <circle cx="200" cy="200" r="160" fill="none" stroke="#9E7C2E" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="120" fill="none" stroke="#9E7C2E" strokeWidth="0.5" strokeDasharray="4 8" />
            <circle cx="200" cy="200" r="80" fill="none" stroke="#9E7C2E" strokeWidth="0.5" />
          </svg>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <span className="section-label">Curated For Her</span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(56px, 8vw, 96px)", fontWeight: 300, fontStyle: "italic", color: "var(--charcoal)", lineHeight: 1 }}>
            Women
          </h1>
          <p style={{ color: "var(--stone)", fontSize: "15px", maxWidth: "420px", marginTop: "16px", fontWeight: 300 }}>
            Pieces shaped by grace — from whisper-thin chains to sculptural rings that speak without words.
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