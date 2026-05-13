"use client";
import { useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/lib/cartStore"; 

const FILTERS = ["All", "Gold", "Silver", "Necklaces", "Rings", "Earrings", "Bracelets"];

export default function ProductGrid({ inventory }: { inventory: any[] }) {
  const [visibleCount, setVisibleCount] = useState(10);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { addToCart: addToGlobalCart } = useCartStore();

  const filteredInventory = inventory.filter((item) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Gold") return item.material.includes("Gold");
    if (activeFilter === "Silver") return item.material.includes("Silver");
    if (activeFilter === "Necklaces") return item.name.includes("Necklace") || item.name.includes("Pendant") || item.name.includes("Choker") || item.name.includes("Chain");
    if (activeFilter === "Rings") return item.name.includes("Ring");
    if (activeFilter === "Earrings") return item.name.includes("Earrings") || item.name.includes("Studs");
    if (activeFilter === "Bracelets") return item.name.includes("Bracelet") || item.name.includes("Cuff") || item.name.includes("Bangle");
    return true;
  });

  const visibleItems = filteredInventory.slice(0, visibleCount);

  const handleFilterClick = (filterName: string) => {
    setActiveFilter(filterName);
    setVisibleCount(10); 
  };

  const addToCart = (product: any) => {
    addToGlobalCart(product);
    setToastMessage(`${product.name} added to cart ✦`);
    setSelectedProduct(null); 
    
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <>
      <div style={{ background: "var(--cream)", padding: "20px 60px", borderBottom: "1px solid rgba(201,168,76,0.15)", display: "flex", gap: "32px", alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--stone)" }}>
          Filter:
        </span>
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => handleFilterClick(f)}
            style={{
              background: activeFilter === f ? "var(--charcoal)" : "none",
              color: activeFilter === f ? "var(--cream)" : "var(--stone)",
              border: activeFilter === f ? "none" : "1px solid rgba(201,168,76,0.2)",
              padding: "6px 16px",
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              transition: "all 0.2s",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "3px", background: "#E8E2D7", padding: "3px" }}>
        {visibleItems.map((p) => (
          <div key={p.id} className="product-card enhanced-hover" style={{ background: p.bg_color }} onClick={() => setSelectedProduct(p)}>
            <div className="product-img-placeholder" style={{ background: p.bg_color, aspectRatio: "3/4", padding: 0 }}>
              <Image src={p.image_url} alt={p.name} fill sizes="(max-width: 600px) 50vw, (max-width: 1024px) 33vw, 20vw" style={{ objectFit: 'cover' }} />
              <div className="product-overlay">
                <div className="product-overlay-content">
                  <h3>{p.name}</h3>
                  <p>QUICK VIEW ✦</p>
                </div>
              </div>
            </div>
            <div className="product-label" style={{ background: p.bg_color }}>
              <h3 style={{ color: "var(--charcoal)" }}>{p.name}</h3>
              <p style={{ color: "var(--stone)" }}>{p.material} · EGP {p.price}</p>
            </div>
          </div>
        ))}
      </div>

      <section style={{ textAlign: "center", padding: "60px", background: "var(--cream)" }}>
        <p style={{ color: "var(--stone)", fontSize: "13px", letterSpacing: "0.1em", marginBottom: "24px" }}>
          Showing {visibleItems.length} of {filteredInventory.length} pieces
        </p>
        {visibleCount < filteredInventory.length && (
          <button className="btn-outline" onClick={() => setVisibleCount(visibleCount + 10)}>Load More</button>
        )}
      </section>

      {selectedProduct && (
        <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedProduct(null)}>✕</button>
            <div className="modal-image-container" style={{ backgroundColor: selectedProduct.bg_color }}>
              <Image src={selectedProduct.image_url} alt={selectedProduct.name} fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="modal-info">
              <span className="modal-category">{selectedProduct.category}</span>
              <h2 className="modal-title">{selectedProduct.name}</h2>
              <p className="modal-material">{selectedProduct.material}</p>
              <div className="modal-divider" />
              <p className="modal-price">EGP {selectedProduct.price}</p>
              <p className="modal-desc">
                Pieces shaped by grace. Crafted with precision and designed for timeless elegance. 
                This piece is ethically sourced and includes a lifetime polish guarantee.
              </p>
              
              {/* LIVE DATABASE CHECK */}
              {selectedProduct.in_stock ? (
                <button className="btn-gold w-full mt-auto" onClick={() => addToCart(selectedProduct)}>
                  Add To Cart — EGP {selectedProduct.price}
                </button>
              ) : (
                <button className="w-full mt-auto" style={{ background: "var(--mist)", color: "var(--charcoal)", padding: "16px", border: "none", textTransform: "uppercase", letterSpacing: "0.2em", fontSize: "11px", cursor: "not-allowed", fontFamily: "var(--font-body)" }} disabled>
                  Currently Out of Stock
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {toastMessage && <div className="toast-notification">{toastMessage}</div>}

      <style jsx>{`
        .enhanced-hover { transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease; }
        .enhanced-hover:hover { transform: translateY(-8px); box-shadow: 0 12px 30px rgba(0,0,0,0.15); z-index: 10; }
        .modal-backdrop { position: fixed; inset: 0; background: rgba(30, 28, 26, 0.65); backdrop-filter: blur(8px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px; animation: fadeIn 0.3s ease; }
        .modal-content { background: var(--warm-white); width: 100%; max-width: 900px; height: 600px; display: flex; position: relative; box-shadow: 0 24px 60px rgba(0,0,0,0.2); animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .close-btn { position: absolute; top: 24px; right: 24px; background: none; border: none; font-size: 20px; color: var(--charcoal); cursor: pointer; z-index: 10; transition: transform 0.3s; }
        .close-btn:hover { transform: rotate(90deg); }
        .modal-image-container { flex: 1; position: relative; }
        .modal-info { flex: 1; padding: 60px; display: flex; flex-direction: column; }
        .modal-category { font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold-dark); margin-bottom: 12px; }
        .modal-title { font-family: var(--font-display); font-size: 42px; font-style: italic; font-weight: 300; color: var(--charcoal); line-height: 1.1; margin-bottom: 8px; }
        .modal-material { font-size: 13px; color: var(--stone); letter-spacing: 0.1em; }
        .modal-divider { width: 40px; height: 1px; background: var(--gold); margin: 32px 0; }
        .modal-price { font-size: 20px; font-weight: 400; color: var(--charcoal); margin-bottom: 24px; }
        .modal-desc { font-size: 14px; line-height: 1.8; color: var(--stone); font-weight: 300; margin-bottom: 40px; }
        .w-full { width: 100%; }
        .mt-auto { margin-top: auto; }
        .toast-notification { position: fixed; bottom: 40px; left: 50%; transform: translateX(-50%); background: var(--charcoal); color: var(--gold-light); padding: 16px 32px; border-radius: 4px; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; z-index: 10000; box-shadow: 0 10px 30px rgba(0,0,0,0.2); border: 1px solid rgba(201,168,76,0.3); animation: toastSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes toastSlideUp { from { opacity: 0; transform: translate(-50%, 20px); } to { opacity: 1; transform: translate(-50%, 0); } }
        @media (max-width: 768px) { .modal-content { flex-direction: column; height: 85vh; overflow-y: auto; } .modal-image-container { min-height: 300px; } .modal-info { padding: 32px; } }
      `}</style>
    </>
  );
}