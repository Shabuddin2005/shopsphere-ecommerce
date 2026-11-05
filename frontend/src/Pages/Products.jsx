
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  // Fetch products from backend
  useEffect(() => {
    fetch('http://localhost:8080/api/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to fetch products');
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

  // Get unique categories from products
  const categories = [
    'All',
    ...new Set(products.map((product) => product.categoryName))
  ];

  // Search and category filtering
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      product.categoryName === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Add product to cart
  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    setMessage('');

    try {
      const response = await fetch(
        `http://localhost:8080/api/cart?productId=${productId}&quantity=1`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Unable to add product to cart');
      }

      setMessage('Product added to cart successfully!');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main className="products-page">

      {/* Page Heading */}
      <section className="products-header">
        <h1>Explore Our Products</h1>
        <p>Find your favourite products at great prices.</p>
      </section>

      {/* Search and Category Filter */}
      <section className="products-controls">

        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="product-search"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-filter"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

      </section>

      {message && (
        <p className="cart-message">{message}</p>
      )}

      {loading && (
        <p className="products-status">Loading products...</p>
      )}

      {error && (
        <p className="products-error">{error}</p>
      )}

      {/* Product Grid */}
      {!loading && !error && (
        <>
          <p className="products-count">
            Showing {filteredProducts.length} products
          </p>

          <section className="products-grid">

            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <article className="product-card" key={product.id}>

                  <div className="product-image-box">
                    <img
                      src={
                        product.imageUrl ||
                        'https://placehold.co/400x300?text=No+Image'
                      }
                      alt={product.name}
                    />
                  </div>

                  <div className="product-details">

                    <span className="product-category">
                      {product.categoryName}
                    </span>

                    <h3>{product.name}</h3>

                    <p className="product-price">
                      ₹{Number(product.price).toLocaleString('en-IN')}
                    </p>

                    <p className={
                      product.quantity > 0
                        ? 'stock-available'
                        : 'stock-unavailable'
                    }>
                      {product.quantity > 0
                        ? `${product.quantity} available`
                        : 'Out of Stock'}
                    </p>

                    <button
                      className="add-cart-button"
                      disabled={product.quantity <= 0}
                      onClick={() => handleAddToCart(product.id)}
                    >
                      {product.quantity > 0
                        ? 'Add to Cart'
                        : 'Out of Stock'}
                    </button>

                  </div>
                </article>
              ))
            ) : (
              <p className="no-products">
                No products found.
              </p>
            )}

          </section>
        </>
      )}

    </main>
  );
}

export default Products;
