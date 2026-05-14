"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "../Footer";
import { useCartStore } from "@/lib/cartStore";

export default function CheckoutPage() {
  const { cart } = useCartStore();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash">("card");

  const subtotal = cart.reduce((sum, item) => sum + Number(item.price) * item.qty, 0);

  useEffect(() => {
    if (cart.length === 0) router.push('/cart');
  }, [cart, router]);

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart, subtotal, paymentMethod })
      });

      const data = await response.json();

      if (data.error) {
        alert(data.error);
        setIsProcessing(false);
        return;
      }

      router.push('/success');

    } catch (error) {
      alert("Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) return null;

  return (
    <>
      <section style={{ height: "30vh", background: "var(--charcoal)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "48px", fontWeight: 300, fontStyle: "italic", color: "var(--cream)" }}>
          Secure Checkout
        </h1>
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "60vh", background: "var(--warm-white)" }}>
        <div style={{ padding: "60px", borderRight: "1px solid var(--mist)", background: "#fff" }}>
          <h2 style={{ fontSize: "14px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--charcoal)", marginBottom: "32px" }}>
            Shipping & Payment Details
          </h2>

          <form onSubmit={handlePaymentSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* Shipping fields */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <input type="text" placeholder="First Name" required className="checkout-input" />
              <input type="text" placeholder="Last Name" required className="checkout-input" />
            </div>
            <input type="text" placeholder="Shipping Address" required className="checkout-input" />
            <input type="text" placeholder="City" required className="checkout-input" />

            <div style={{ borderTop: "1px solid var(--mist)", margin: "8px 0" }} />

            {/* Payment method selector */}
            <p style={{ fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", fontFamily: "var(--font-body)" }}>
              Payment Method
            </p>

            {[
              { id: "card", label: "Credit / Debit Card", sub: "VISA · MC" },
              { id: "cash", label: "Cash on Delivery", sub: "Pay when you receive" },
            ].map(({ id, label, sub }) => (
              <div
                key={id}
                onClick={() => setPaymentMethod(id as "card" | "cash")}
                style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "14px 16px", cursor: "pointer",
                  border: `1px solid ${paymentMethod === id ? "var(--gold)" : "var(--mist)"}`,
                  background: paymentMethod === id ? "rgba(201,168,76,0.06)" : "transparent",
                  transition: "all 0.2s",
                  marginTop: "-12px",
                }}
              >
                {/* Radio circle */}
                <div style={{
                  width: "16px", height: "16px", borderRadius: "50%", flexShrink: 0,
                  border: `1px solid ${paymentMethod === id ? "var(--gold)" : "var(--mist)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {paymentMethod === id && (
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--gold)" }} />
                  )}
                </div>
                <span style={{ fontSize: "13px", color: "var(--charcoal)", fontFamily: "var(--font-body)" }}>{label}</span>
                <span style={{ marginLeft: "auto", fontSize: "11px", color: "var(--stone)", fontFamily: "var(--font-body)" }}>{sub}</span>
              </div>
            ))}

            <div style={{ borderTop: "1px solid var(--mist)", margin: "8px 0" }} />

            {/* Card fields — only show when card is selected */}
            {paymentMethod === "card" && (
              <>
                <input type="text" placeholder="Card Number" required maxLength={16} className="checkout-input" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <input type="text" placeholder="MM/YY" required maxLength={5} className="checkout-input" />
                  <input type="text" placeholder="CVC" required maxLength={3} className="checkout-input" />
                </div>
              </>
            )}

            {/* Cash confirmation box — only show when cash is selected */}
            {paymentMethod === "cash" && (
              <div style={{
                padding: "20px 24px",
                background: "rgba(201,168,76,0.06)",
                border: "1px solid var(--gold)",
                display: "flex", alignItems: "flex-start", gap: "16px",
              }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: "2px" }}>
                  <circle cx="10" cy="10" r="9" stroke="#C9A84C" strokeWidth="1" />
                  <path d="M6 10l3 3 5-5" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <p style={{ fontSize: "14px", color: "var(--charcoal)", marginBottom: "6px", fontFamily: "var(--font-body)" }}>
                    Cash on Delivery selected
                  </p>
                  <p style={{ fontSize: "12px", color: "var(--stone)", lineHeight: 1.6, fontFamily: "var(--font-body)" }}>
                    No payment needed now. You will pay <strong>EGP {subtotal.toLocaleString()}</strong> in cash when your order arrives.
                  </p>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="btn-gold"
              style={{ padding: "18px", marginTop: "8px", opacity: isProcessing ? 0.7 : 1 }}
              disabled={isProcessing}
            >
              {isProcessing
                ? "Processing..."
                : paymentMethod === "cash"
                ? `Place Order — EGP ${subtotal.toLocaleString()}`
                : `Pay EGP ${subtotal.toLocaleString()}`}
            </button>

            <p style={{ textAlign: "center", fontSize: "11px", color: "var(--stone)", fontFamily: "var(--font-body)" }}>
              By placing your order, you agree to our Terms of Service.
            </p>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div style={{ padding: "60px", background: "var(--cream)" }}>
          <h2 style={{ fontSize: "14px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--charcoal)", marginBottom: "32px" }}>
            In Your Bag
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {cart.map((item) => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--mist)", paddingBottom: "16px" }}>
                <div>
                  <span style={{ fontSize: "14px", color: "var(--charcoal)", display: "block", marginBottom: "4px" }}>{item.name}</span>
                  <span style={{ fontSize: "11px", color: "var(--stone)" }}>Qty: {item.qty}</span>
                </div>
                <span style={{ fontSize: "14px", color: "var(--charcoal)" }}>EGP {(Number(item.price) * item.qty).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "24px", paddingTop: "16px", display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--mist)" }}>
            <span style={{ fontSize: "13px", color: "var(--stone)" }}>Shipping</span>
            <span style={{ fontSize: "13px", color: "var(--gold-dark)" }}>Free</span>
          </div>

          <div style={{ marginTop: "16px", paddingTop: "16px", display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--mist)" }}>
            <span style={{ fontSize: "18px", color: "var(--charcoal)" }}>Total</span>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontStyle: "italic", color: "var(--charcoal)" }}>
              EGP {subtotal.toLocaleString()}
            </span>
          </div>
        </div>
      </section>

      <Footer />
      <style jsx>{`
        .checkout-input { padding: 14px 16px; border: 1px solid var(--mist); background: transparent; font-family: var(--font-body); font-size: 14px; color: var(--charcoal); outline: none; transition: border-color 0.3s ease; width: 100%; }
        .checkout-input:focus { border-color: var(--gold); }
        @media (max-width: 768px) { section[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}