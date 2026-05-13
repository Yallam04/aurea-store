"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "../Footer";
import { useCartStore } from "@/lib/cartStore";

export default function CheckoutPage() {
  const { cart } = useCartStore(); // <-- Notice clearCart is gone!
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + Number(item.price) * item.qty, 0);

  // Security check: If cart is empty, kick them back
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
        body: JSON.stringify({ cart, subtotal })
      });

      const data = await response.json();

      if (data.error) {
        alert(data.error);
        setIsProcessing(false);
        return;
      }

      // Success! Go to the Thank You page WITHOUT wiping the cart yet
      router.push('/success');

    } catch (error) {
      alert("Payment failed. Please try again.");
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
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <input type="text" placeholder="First Name" required className="checkout-input" />
              <input type="text" placeholder="Last Name" required className="checkout-input" />
            </div>
            <input type="text" placeholder="Shipping Address" required className="checkout-input" />
            <input type="text" placeholder="City" required className="checkout-input" />

            <div style={{ borderTop: "1px solid var(--mist)", margin: "16px 0" }} />
            
            <input type="text" placeholder="Card Number" required maxLength={16} className="checkout-input" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <input type="text" placeholder="MM/YY" required maxLength={5} className="checkout-input" />
              <input type="text" placeholder="CVC" required maxLength={3} className="checkout-input" />
            </div>

            <button type="submit" className="btn-gold" style={{ padding: "18px", marginTop: "24px", opacity: isProcessing ? 0.7 : 1 }} disabled={isProcessing}>
              {isProcessing ? "Processing Payment..." : `Pay EGP ${subtotal.toLocaleString()}`}
            </button>
            <p style={{ textAlign: "center", fontSize: "11px", color: "var(--stone)" }}>By clicking "Pay", you agree to our Terms of Service.</p>
          </form>
        </div>

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

          <div style={{ marginTop: "32px", paddingTop: "20px", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "18px", color: "var(--charcoal)" }}>Total</span>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontStyle: "italic", color: "var(--charcoal)" }}>
              EGP {subtotal.toLocaleString()}
            </span>
          </div>
        </div>
      </section>
      <Footer />
      <style jsx>{`
        .checkout-input { padding: 14px 16px; border: 1px solid var(--mist); background: transparent; font-family: var(--font-body); font-size: 14px; color: var(--charcoal); outline: none; transition: border-color 0.3s ease; }
        .checkout-input:focus { border-color: var(--gold); }
        @media (max-width: 768px) { section[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}