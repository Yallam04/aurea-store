"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth, useClerk } from "@clerk/nextjs"; // <-- NEW: Clerk hooks
import Footer from "../Footer";
import { useCartStore } from "@/lib/cartStore";

export default function CartPage() {
  const { cart, removeFromCart, updateQty, clearCart } = useCartStore();
  const router = useRouter();

  // <-- NEW: Check if logged in, and grab the manual pop-up function
  const { isSignedIn } = useAuth();
  const { openSignIn } = useClerk();

  const subtotal = cart.reduce((sum, item) => sum + Number(item.price) * item.qty, 0);

  // The NEW Smart Checkout Function
  const handleCheckoutClick = () => {
    if (cart.length === 0) return;

    // 1. If the user is NOT logged in, force the pop-up to appear!
    if (!isSignedIn) {
      // After they log in, it will automatically send them to the payment page
      openSignIn({ fallbackRedirectUrl: '/checkout' }); 
      return;
    }

    // 2. If they ARE logged in, send them straight to payment
    router.push('/checkout');
  };

  return (
    <>
      <section style={{ height: "35vh", background: "var(--charcoal)", display: "flex", alignItems: "flex-end", padding: "60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: "60px", top: "50%", transform: "translateY(-50%)", opacity: 0.08 }}>
          <svg width="300" height="300" viewBox="0 0 300 300">
            {[...Array(4)].map((_, i) => <circle key={i} cx="150" cy="150" r={50 + i * 40} fill="none" stroke="#C9A84C" strokeWidth="0.5" />)}
          </svg>
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <span className="section-label">Your Selection</span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px, 7vw, 80px)", fontWeight: 300, fontStyle: "italic", color: "var(--cream)", lineHeight: 1 }}>
            Your Cart
          </h1>
        </div>
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", minHeight: "60vh", background: "var(--warm-white)" }}>
        {/* Left Side: Items */}
        <div style={{ padding: "60px", borderRight: "1px solid var(--mist)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px", paddingBottom: "20px", borderBottom: "1px solid var(--mist)" }}>
            <span style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--stone)" }}>{cart.length} Items</span>
            {cart.length > 0 && (
              <button onClick={clearCart} style={{ background: "none", border: "none", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--stone)", cursor: "pointer", textDecoration: "underline" }}>
                Clear All
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <p style={{ color: "var(--stone)", marginBottom: "32px", fontSize: "15px" }}>Your jewelry box is empty.</p>
              <Link href="/collections" className="btn-gold" style={{ padding: "16px 40px" }}>Browse Collections</Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              {cart.map((item) => (
                <div key={item.id} style={{ display: "grid", gridTemplateColumns: "100px 1fr auto", gap: "28px", alignItems: "center", paddingBottom: "32px", borderBottom: "1px solid var(--mist)" }}>
                  <div style={{ width: "100px", height: "100px", background: item.bg_color, position: "relative" }}>
                    <Image src={item.image_url} alt={item.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 400, fontStyle: "italic", color: "var(--charcoal)", marginBottom: "4px" }}>{item.name}</h3>
                    <p style={{ fontSize: "12px", color: "var(--stone)", letterSpacing: "0.1em", marginBottom: "16px" }}>{item.material}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--mist)", width: "fit-content" }}>
                        <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ width: "32px", height: "32px", background: "none", border: "none", cursor: "pointer", fontSize: "16px", color: "var(--stone)" }}>−</button>
                        <span style={{ width: "32px", textAlign: "center", fontSize: "14px", color: "var(--charcoal)" }}>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ width: "32px", height: "32px", background: "none", border: "none", cursor: "pointer", fontSize: "16px", color: "var(--stone)" }}>+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", fontSize: "11px", textTransform: "uppercase", color: "var(--stone)", cursor: "pointer", textDecoration: "underline" }}>Remove</button>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 400, fontStyle: "italic", color: "var(--charcoal)" }}>
                      EGP {(Number(item.price) * item.qty).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Order Summary */}
        <div style={{ padding: "60px", background: "var(--cream)" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 300, fontStyle: "italic", color: "var(--charcoal)", marginBottom: "40px" }}>Order Summary</h2>
          <div style={{ borderTop: "1px solid var(--mist)", paddingTop: "20px", marginBottom: "12px", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "13px", color: "var(--stone)" }}>Subtotal</span>
            <span style={{ fontSize: "13px", color: "var(--charcoal)" }}>EGP {subtotal.toLocaleString()}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
            <span style={{ fontSize: "13px", color: "var(--stone)" }}>Shipping</span>
            <span style={{ fontSize: "13px", color: "var(--gold-dark)" }}>Free</span>
          </div>
          <div style={{ borderTop: "1px solid var(--mist)", paddingTop: "20px", marginBottom: "40px", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "15px", fontWeight: 400, color: "var(--charcoal)" }}>Total</span>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 400, fontStyle: "italic", color: "var(--charcoal)" }}>
              EGP {subtotal.toLocaleString()}
            </span>
          </div>

          <button className="btn-gold" style={{ width: "100%", padding: "18px" }} onClick={handleCheckoutClick}>
            Proceed to Checkout
          </button>
        </div>
      </section>

      <Footer />
      <style>{`@media (max-width: 768px) { section[style*="grid-template-columns: 1.6fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
}