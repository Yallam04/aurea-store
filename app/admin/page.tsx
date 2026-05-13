"use client";
import { useState, useEffect, useMemo } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ADMIN_EMAIL = "yallam04@gmail.com"; 

export default function AdminDashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [inventory, setInventory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingItem, setEditingItem] = useState<any | null>(null);

  const [sortConfig, setSortConfig] = useState<{ key: 'price' | 'stock_quantity', direction: 'asc' | 'desc' } | null>(null);

  const [newItem, setNewItem] = useState({ name: "", category: "Women", material: "", price: "", image_url: "", bg_color: "#E8DDD0", stock_quantity: 10 });

  useEffect(() => {
    if (isLoaded && user?.emailAddresses[0]?.emailAddress !== ADMIN_EMAIL) {
      router.push("/"); 
    } else if (isLoaded) {
      fetchInventory();
    }
  }, [user, isLoaded, router]);

  const fetchInventory = async () => {
    const res = await fetch('/api/admin/inventory');
    if (res.ok) {
      const data = await res.json();
      setInventory(data);
    }
    setLoading(false);
  };

  const handleAction = async (action: string, payload: any) => {
    if (action === "DELETE") setInventory(inventory.filter(i => i.id !== payload.id));

    await fetch('/api/admin/inventory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, payload })
    });
    fetchInventory(); 
  };

  // ✦ NEW: Sorting Logic Function
  const requestSort = (key: 'price' | 'stock_quantity') => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // ✦ NEW: Combines Search AND Sorting seamlessly
  const filteredAndSortedInventory = useMemo(() => {
    // 1. First, apply the search filter
    let processedList = inventory;
    if (searchQuery.trim()) {
      const searchTerms = searchQuery.toLowerCase().split(' ').filter(term => term.length > 0);
      processedList = inventory.filter(item => {
        const searchableData = `${item.name} ${item.category} ${item.material} ${item.price}`.toLowerCase();
        return searchTerms.every(term => searchableData.includes(term));
      });
    }

    // 2. Then, apply the sorting
    if (sortConfig !== null) {
      processedList = [...processedList].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return processedList;
  }, [inventory, searchQuery, sortConfig]);

  if (!isLoaded || loading) return <div style={{ minHeight: "100vh", background: "var(--charcoal)", padding: "60px", color: "var(--gold)" }}>Authenticating...</div>;

  return (
    <div style={{ minHeight: "100vh", background: "var(--charcoal)", color: "var(--cream)", padding: "60px", display: "flex", flexDirection: "column" }}>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px", borderBottom: "1px solid rgba(201,168,76,0.2)", paddingBottom: "20px", flexShrink: 0 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "42px", fontStyle: "italic", fontWeight: 300 }}>Auréa Command Center</h1>
        <Link href="/" style={{ color: "var(--gold)", fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>← Back to Store</Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2.5fr", gap: "40px", flex: 1, minHeight: 0 }}>
        
        {/* Add Form */}
        <div style={{ background: "rgba(255,255,255,0.02)", padding: "40px", borderRadius: "8px", height: "fit-content", border: "1px solid rgba(255,255,255,0.05)" }}>
           <h2 style={{ fontSize: "14px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mist)", marginBottom: "32px" }}>Add New Piece</h2>
           <form onSubmit={(e) => { e.preventDefault(); handleAction("ADD", newItem); }} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
             <input placeholder="Product Name" required onChange={(e) => setNewItem({...newItem, name: e.target.value})} className="admin-input" />
             <select onChange={(e) => setNewItem({...newItem, category: e.target.value})} className="admin-input">
               <option value="Women">Women</option>
               <option value="Men">Men</option>
             </select>
             <input placeholder="Material" required onChange={(e) => setNewItem({...newItem, material: e.target.value})} className="admin-input" />
             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
               <input type="number" placeholder="Price" required onChange={(e) => setNewItem({...newItem, price: e.target.value})} className="admin-input" />
               <input type="number" placeholder="Qty in Stock" required onChange={(e) => setNewItem({...newItem, stock_quantity: Number(e.target.value)})} className="admin-input" />
             </div>
             <input placeholder="Image URL (/images/product.jpg)" required onChange={(e) => setNewItem({...newItem, image_url: e.target.value})} className="admin-input" />
             <button type="submit" className="btn-gold" style={{ padding: "12px", marginTop: "16px" }}>Publish Item ✦</button>
           </form>
        </div>

        {/* Inventory Table */}
        <div style={{ background: "rgba(255,255,255,0.02)", padding: "40px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", maxHeight: "800px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", flexShrink: 0 }}>
            <h2 style={{ fontSize: "14px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mist)", margin: 0 }}>Live Inventory ({filteredAndSortedInventory.length})</h2>
            <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="admin-input search-bar" style={{ padding: "10px 16px", width: "350px", borderRadius: "4px" }} />
          </div>
          
          <div className="custom-scroll" style={{ overflowY: "auto", flex: 1, paddingRight: "16px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
              <thead style={{ position: "sticky", top: 0, zIndex: 10 }}>
                <tr style={{ background: "#22211F", color: "var(--stone)", letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "10px" }}>
                  <th style={{ padding: "16px 0", borderBottom: "1px solid rgba(201,168,76,0.2)" }}>Name</th>
                  <th style={{ padding: "16px 0", borderBottom: "1px solid rgba(201,168,76,0.2)" }}>Category</th>
                  
                  {/* ✦ NEW: Clickable Sortable Headers ✦ */}
                  <th 
                    onClick={() => requestSort('price')} 
                    style={{ padding: "16px 0", borderBottom: "1px solid rgba(201,168,76,0.2)", cursor: "pointer" }}
                    title="Click to sort by price"
                  >
                    Price <span style={{ color: sortConfig?.key === 'price' ? 'var(--gold)' : 'var(--stone)' }}>{sortConfig?.key === 'price' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕'}</span>
                  </th>
                  
                  <th 
                    onClick={() => requestSort('stock_quantity')} 
                    style={{ padding: "16px 0", borderBottom: "1px solid rgba(201,168,76,0.2)", cursor: "pointer" }}
                    title="Click to sort by stock quantity"
                  >
                    Qty in Stock <span style={{ color: sortConfig?.key === 'stock_quantity' ? 'var(--gold)' : 'var(--stone)' }}>{sortConfig?.key === 'stock_quantity' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕'}</span>
                  </th>
                  
                  <th style={{ padding: "16px 0", borderBottom: "1px solid rgba(201,168,76,0.2)" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedInventory.map((item) => (
                  <tr key={item.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <td style={{ padding: "16px 0", color: "var(--cream)" }}>
                      {item.name}
                      <span style={{ display: "block", fontSize: "10px", color: "var(--stone)", marginTop: "4px" }}>{item.material}</span>
                    </td>
                    <td style={{ color: "var(--stone)" }}>{item.category}</td>
                    <td>
                      <input type="number" defaultValue={item.price} onBlur={(e) => { if (Number(e.target.value) !== item.price) handleAction("UPDATE_PRICE", { id: item.id, price: Number(e.target.value) }) }} className="admin-input" style={{ width: "80px", padding: "6px" }} />
                    </td>
                    <td>
                      <input type="number" defaultValue={item.stock_quantity} onBlur={(e) => { if (Number(e.target.value) !== item.stock_quantity) handleAction("UPDATE_STOCK", { id: item.id, stock_quantity: Number(e.target.value) }) }} className="admin-input" style={{ width: "60px", padding: "6px", color: item.stock_quantity > 0 ? "#2ecc71" : "#e74c3c" }} />
                    </td>
                    <td>
                      <button onClick={() => setEditingItem(item)} style={{ color: "var(--gold)", background: "none", border: "none", cursor: "pointer", fontSize: "12px", textDecoration: "underline", marginRight: "16px" }}>Edit</button>
                      <button onClick={() => { if(window.confirm(`Are you sure you want to delete the ${item.name}?`)) handleAction("DELETE", { id: item.id }) }} style={{ color: "var(--stone)", background: "none", border: "none", cursor: "pointer", fontSize: "12px", textDecoration: "underline" }}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10000, backdropFilter: "blur(6px)" }}>
          <div style={{ background: "var(--charcoal)", padding: "40px", borderRadius: "8px", width: "100%", maxWidth: "500px", border: "1px solid rgba(201,168,76,0.3)", boxShadow: "0 24px 60px rgba(0,0,0,0.5)" }}>
            <h2 style={{ color: "var(--cream)", marginBottom: "32px", fontFamily: "var(--font-display)", fontSize: "32px", fontStyle: "italic", fontWeight: 300 }}>Edit Piece</h2>
            
            <div style={{ width: "100%", height: "150px", background: editingItem.bg_color, borderRadius: "4px", marginBottom: "20px", display: "flex", justifyContent: "center", overflow: "hidden" }}>
              <img src={editingItem.image_url} alt={editingItem.name} style={{ height: "100%", objectFit: "contain" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "10px", color: "var(--stone)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Name</label>
                <input className="admin-input" style={{ width: "100%" }} value={editingItem.name} onChange={(e) => setEditingItem({...editingItem, name: e.target.value})} />
              </div>
              <div>
                <label style={{ fontSize: "10px", color: "var(--stone)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Stock Qty</label>
                <input className="admin-input" type="number" style={{ width: "100%" }} value={editingItem.stock_quantity} onChange={(e) => setEditingItem({...editingItem, stock_quantity: Number(e.target.value)})} />
              </div>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px" }}>
              <div>
                {/* ✦ NEW: Edit Material Input ✦ */}
                <label style={{ fontSize: "10px", color: "var(--stone)", letterSpacing: "0.2em", textTransform: "uppercase", display: "block" }}>Material</label>
                <input className="admin-input" style={{ width: "100%" }} value={editingItem.material} onChange={(e) => setEditingItem({...editingItem, material: e.target.value})} />
              </div>
              <div>
                <label style={{ fontSize: "10px", color: "var(--stone)", letterSpacing: "0.2em", textTransform: "uppercase", display: "block" }}>Image URL</label>
                <input className="admin-input" style={{ width: "100%" }} value={editingItem.image_url} onChange={(e) => setEditingItem({...editingItem, image_url: e.target.value})} />
              </div>
            </div>
            
            <div style={{ display: "flex", gap: "16px", marginTop: "32px" }}>
              <button className="btn-gold" style={{ flex: 1, padding: "14px", border: "none", cursor: "pointer" }} onClick={async () => { await handleAction("EDIT_ITEM", editingItem); setEditingItem(null); }}>Save Changes</button>
              <button style={{ flex: 1, background: "transparent", border: "1px solid var(--mist)", color: "var(--stone)", cursor: "pointer" }} onClick={() => setEditingItem(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .admin-input { padding: 12px 16px; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); color: var(--cream); font-family: var(--font-body); font-size: 14px; outline: none; transition: all 0.2s ease; }
        .admin-input:focus { border-color: var(--gold); background: rgba(0,0,0,0.4); }
        .custom-scroll::-webkit-scrollbar { width: 6px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.3); border-radius: 10px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: rgba(201,168,76,0.8); }
      `}</style>
    </div>
  );
}