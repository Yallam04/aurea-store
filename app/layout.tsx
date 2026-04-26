"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./globals.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/women", label: "Women" },
  { href: "/men", label: "Men" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap" rel="stylesheet" />
        <title>Auréa Jewelry</title>
      </head>

      <body>
        {/* Cart icon — top right */}
        <Link
          href="/cart"
          style={{
            position: "fixed",
            top: "24px",
            right: "32px",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
          }}
        >
          <div style={{ position: "relative" }}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--gold)"
              strokeWidth="1.4"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>

            <div
              style={{
                position: "absolute",
                top: "-6px",
                right: "-6px",
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background: "var(--gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "9px",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                color: "var(--charcoal)",
              }}
            >
              3
            </div>
          </div>
        </Link>

        {/* Hamburger toggle (MENU ICON) */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`burger ${menuOpen ? "open" : ""}`}>
            <span />
            <span />
            <span />
          </span>
        </button>

        {/* Sidebar overlay */}
        <div
          className={`sidebar-overlay ${menuOpen ? "visible" : ""}`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Sidebar */}
        <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
          <div className="sidebar-logo">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              <span className="logo-aurea">Auréa</span>
              <span className="logo-sub">Jewelry</span>
            </Link>
          </div>

          <nav className="sidebar-nav">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`nav-link ${pathname === href ? "active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}

            <Link
              href="/cart"
              className={`nav-link ${pathname === "/cart" ? "active" : ""}`}
              onClick={() => setMenuOpen(false)}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <span>Cart</span>
              <span
                style={{
                  background: "var(--gold)",
                  color: "var(--charcoal)",
                  fontSize: "9px",
                  fontWeight: 500,
                  padding: "2px 7px",
                  borderRadius: "10px",
                }}
              >
                3 items
              </span>
            </Link>
          </nav>

          <div className="sidebar-footer">
            <p>Crafted with care since 2020</p>
          </div>
        </aside>

        {/* Main content */}
        <main className={`main-content ${menuOpen ? "shifted" : ""}`}>
          {children}
        </main>

        {/* INLINE STYLE FIX for hamburger color */}
        <style jsx>{`
          .menu-toggle .burger span {
            background: var(--gold) !important;
          }

          .menu-toggle {
            position: fixed;
            top: 24px;
            left: 32px;
            z-index: 1000;
            background: transparent;
            border: none;
            cursor: pointer;
          }

          .burger span {
            display: block;
            width: 26px;
            height: 2px;
            margin: 5px 0;
            transition: 0.3s;
          }
        `}</style>
      </body>
    </html>
  );
}