"use client";
import { useEffect } from "react";
import Link from "next/link";
import Footer from "../Footer";
import { useCartStore } from "@/lib/cartStore"; // <-- Connect to the memory

export default function SuccessPage() {
  const { clearCart } = useCartStore();

  // Wipe the cart clean ONLY after they safely arrive on this page!
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <>
      <section
        style={{
          minHeight: "80vh",
          background: "var(--warm-white)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#C5A454", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "32px" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1f1d1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        <span style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--stone)", marginBottom: "24px" }}>
          Order Confirmed
        </span>

        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(42px, 6vw, 64px)", fontWeight: 400, fontStyle: "italic", color: "var(--charcoal)", marginBottom: "24px", lineHeight: 1.1 }}>
          Thank you for your purchase.
        </h1>

        <p style={{ color: "var(--stone)", fontSize: "15px", maxWidth: "460px", marginBottom: "48px", fontWeight: 300, lineHeight: 1.6 }}>
          Your order is currently being processed. You will receive an email confirmation shortly with your shipping details.
        </p>

        <Link href="/collections" className="btn-gold" style={{ padding: "16px 32px" }}>
          RETURN TO COLLECTIONS
        </Link>
      </section>
      
      <Footer />
    </>
  );
}