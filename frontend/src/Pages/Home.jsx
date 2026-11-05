
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load products');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <main className="home-page">

      {/* Hero Section */}
      <section className="home-hero">
        <div className="hero-content">
          <span className="hero-tag">WELCOME TO SHOPSPHERE</span>

          <h1>
            Discover Products.
            <br />
            Enjoy Better Shopping.
          </h1>

          <p>
            Explore amazing products across electronics,
            fashion and more at great prices.
          </p>

          <Link to="/products" className="hero-button">
            Explore Products
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="home-featured">
        <div className="featured-heading">
          <div>
            <span className="section-tag">OUR COLLECTION</span>
            <h2>Featured Products</h2>
            <p>Explore some of our popular products.</p>
          </div>

          <Link to="/products" className="view-all">
            View All Products →
          </Link>
        </div>

        {loading && (
          <p className="home-message">Loading products...</p>
        )}

        {error && (
          <p className="home-error">{error}</p>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="home-message">No products available.</p>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="home-product-grid">
            {products.slice(0, 8).map((product) => (
              <article className="home-product-card" key={product.id}>

                <div className="product-image-container">
                  <img
                    src={
                      product.imageUrl ||
                      'https://placehold.co/400x300?text=No+Image'
                    }
                    alt={product.name}
                    className="home-product-image"
                  />
                </div>

                <div className="home-product-info">
                  <h3>{product.name}</h3>

                  <p className="home-product-price">
                    ₹{Number(product.price).toLocaleString('en-IN')}
                  </p>

                  <p className="home-product-stock">
                    {product.quantity > 0
                      ? 'In Stock'
                      : 'Out of Stock'}
                  </p>

                  <Link
                    to="/products"
                    className="product-view-button"
                  >
                    View Product
                  </Link>
                </div>

              </article>
            ))}
          </div>
        )}
      </section>

      {/* Benefits Section */}
      <section className="home-benefits">
        <div className="benefit-item">
          <span>🚚</span>
          <h3>Fast Delivery</h3>
          <p>Convenient shopping experience.</p>
        </div>

        <div className="benefit-item">
          <span>🔒</span>
          <h3>Secure Shopping</h3>
          <p>Your account and orders are protected.</p>
        </div>

        <div className="benefit-item">
          <span>⭐</span>
          <h3>Quality Products</h3>
          <p>Explore our product collection.</p>
        </div>
      </section>

    </main>
  );
}

export default Home;
