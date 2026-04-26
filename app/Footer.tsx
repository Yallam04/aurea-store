import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="logo-aurea">Auréa</span>
          <span className="logo-sub">Jewelry</span>
          <p>
            Handcrafted gold and silver jewelry for those who appreciate beauty in simplicity. Made with love, worn with pride.
          </p>
        </div>
        <div className="footer-col">
          <h4>Navigate</h4>
          <Link href="/">Home</Link>
          <Link href="/women">Women</Link>
          <Link href="/men">Men</Link>
          <Link href="/collections">Collections</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <a href="mailto:hello@aureajewelry.com">hello@aureajewelry.com</a>
          <a href="tel:+201234567890">+20 123 456 7890</a>
          <a href="#">Cairo, Egypt</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 Auréa Jewelry. All rights reserved.</span>
        <span>University Project — Fashion & Design</span>
      </div>
    </footer>
  );
}
