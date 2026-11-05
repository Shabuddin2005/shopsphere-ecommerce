
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Orders.css';

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        'http://localhost:8080/api/orders',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Unable to load orders');
      }

      const data = await response.json();
      setOrders(data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    fetchOrders();
  }, []);

  const placeOrder = async () => {
    try {
      setPlacingOrder(true);
      setError('');
      setMessage('');

      const response = await fetch(
        'http://localhost:8080/api/orders',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to place order');
      }

      setMessage('Your order has been placed successfully!');

      await fetchOrders();

    } catch (err) {
      setError(err.message);
    } finally {
      setPlacingOrder(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="orders-status">Loading your orders...</div>;
  }

  return (
    <div className="orders-page">

      <div className="orders-header">
        <h1>My Orders</h1>
        <p>Track and manage your ShopSphere purchases.</p>
      </div>

      {message && (
        <div className="orders-success">{message}</div>
      )}

      {error && (
        <div className="orders-error">{error}</div>
      )}

      <div className="orders-action">
        <Link to="/cart" className="view-cart-button">
          View Cart
        </Link>

        <button
          className="place-order-button"
          onClick={placeOrder}
          disabled={placingOrder}
        >
          {placingOrder ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>

      <div className="orders-list">

        {orders.length === 0 ? (
          <div className="empty-orders">
            <div className="empty-orders-icon">📦</div>
            <h2>No Orders Yet</h2>
            <p>Your order history will appear here.</p>

            <Link to="/products" className="shop-now-button">
              Start Shopping
            </Link>
          </div>
        ) : (
          orders.map((order) => (
            <div className="order-card" key={order.id}>

              <div className="order-card-header">
                <div>
                  <h3>Order #{order.id}</h3>
                  <p>{formatDate(order.createdAt)}</p>
                </div>

                <span
                  className={`order-status ${String(order.status || '')
                    .toLowerCase()}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="order-products">

                {order.items.map((item) => (
                  <div className="order-product" key={item.id}>

                    <div className="order-product-info">
                      <h4>{item.productName}</h4>

                      <p>
                        ₹{Number(item.price).toLocaleString('en-IN')}
                        {' × '}
                        {item.quantity}
                      </p>
                    </div>

                    <p className="order-item-total">
                      ₹{(
                        Number(item.price) * item.quantity
                      ).toLocaleString('en-IN')}
                    </p>

                  </div>
                ))}

              </div>

              <div className="order-card-footer">
                <span>Order Total</span>

                <strong>
                  ₹{Number(order.totalAmount).toLocaleString('en-IN')}
                </strong>
              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default Orders;
