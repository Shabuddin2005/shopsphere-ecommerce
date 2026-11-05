
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-section footer-brand">
          <h2>ShopSphere</h2>
          <p>
            Your one-stop destination for electronics,
            fashion and everyday essentials.
            Enjoy a simple and convenient shopping experience.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Shopping Cart</Link>
          <Link to="/orders">My Orders</Link>
        </div>

        {/* Account */}
        <div className="footer-section">
          <h3>My Account</h3>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/cart">My Cart</Link>
          <Link to="/orders">Order History</Link>
        </div>

        {/* Shopping Information */}
        <div className="footer-section">
          <h3>Shopping With Us</h3>
          <p>Explore our latest products.</p>
          <p>Discover electronics and fashion.</p>
          <p>Enjoy convenient online shopping.</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} ShopSphere.
          All Rights Reserved.
        </p>
        <p>Designed with care for a better shopping experience.</p>
      </div>

    </footer>
  );
}

export default Footer;
