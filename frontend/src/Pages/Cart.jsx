
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  const fetchCart = async () => {
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const [cartResponse, productsResponse] = await Promise.all([
        fetch('http://localhost:8080/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }),
        fetch('http://localhost:8080/api/products')
      ]);

      if (cartResponse.status === 401 || cartResponse.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
        return;
      }

      if (!cartResponse.ok || !productsResponse.ok) {
        throw new Error('Unable to load cart details');
      }

      const cartData = await cartResponse.json();
      const productData = await productsResponse.json();

      setCartItems(cartData);
      setProducts(productData);

    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const getProduct = (productId) => {
    return products.find(
      (product) => product.id === productId
    );
  };

  const removeItem = async (cartId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/cart/${cartId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Unable to remove product');
      }

      setCartItems((previousItems) =>
        previousItems.filter((item) => item.id !== cartId)
      );

    } catch (err) {
      setError(err.message);
    }
  };

  const totalAmount = cartItems.reduce((total, item) => {
    const product = getProduct(item.productId);

    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  if (loading) {
    return <div className="cart-status">Loading your cart...</div>;
  }

  if (error && cartItems.length === 0) {
    return <div className="cart-error">{error}</div>;
  }

  return (
    <div className="cart-page">

      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <p>Review your selected products before checkout.</p>
      </div>

      {error && <p className="cart-error-message">{error}</p>}

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>You haven't added any products yet.</p>
          <Link to="/products" className="continue-shopping">
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="cart-layout">

          <div className="cart-items-section">

            {cartItems.map((item) => {
              const product = getProduct(item.productId);

              if (!product) return null;

              return (
                <div className="cart-item" key={item.id}>

                  <div className="cart-product-image">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                    />
                  </div>

                  <div className="cart-product-details">
                    <h3>{product.name}</h3>

                    <p className="cart-product-price">
                      ₹{product.price.toLocaleString('en-IN')}
                    </p>

                    <p className="cart-product-quantity">
                      Quantity: {item.quantity}
                    </p>

                    <p className="cart-item-subtotal">
                      Subtotal: ₹{(
                        product.price * item.quantity
                      ).toLocaleString('en-IN')}
                    </p>
                  </div>

                  <button
                    className="remove-cart-button"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>

                </div>
              );
            })}

            <Link to="/products" className="continue-shopping-link">
              ← Continue Shopping
            </Link>

          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Total Items</span>
              <span>
                {cartItems.reduce(
                  (total, item) => total + item.quantity, 0
                )}
              </span>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>
                ₹{totalAmount.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span className="free-delivery">Free</span>
            </div>

            <div className="summary-total">
              <span>Total Amount</span>
              <span>
                ₹{totalAmount.toLocaleString('en-IN')}
              </span>
            </div>

            <button
              className="checkout-button"
              onClick={() => navigate('/orders')}
            >
              Proceed to Checkout
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Cart;
