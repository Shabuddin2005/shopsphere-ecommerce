
package com.shopsphere.service;

import com.shopsphere.entity.Cart;
import com.shopsphere.entity.Order;
import com.shopsphere.entity.OrderItem;
import com.shopsphere.entity.Product;

import com.shopsphere.repository.CartRepository;
import com.shopsphere.repository.OrderRepository;
import com.shopsphere.repository.ProductRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    public OrderService(
            OrderRepository orderRepository,
            CartRepository cartRepository,
            ProductRepository productRepository) {

        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
    }

    // Place a new order
    @Transactional
    public Order placeOrder(String userEmail) {

        // 1. Get customer's cart items
        List<Cart> cartItems =
                cartRepository.findByUserEmail(userEmail);

        if (cartItems.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Your cart is empty"
            );
        }

        // 2. Create a new order
        Order order = new Order(userEmail, 0.0, "PLACED");

        double totalAmount = 0.0;

        // 3. Process each cart item
        for (Cart cart : cartItems) {

            Product product = productRepository.findById(
                    cart.getProductId()
            ).orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Product not found"
            ));

            // 4. Check available stock
            if (product.getQuantity() < cart.getQuantity()) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Insufficient stock for " + product.getName()
                );
            }

            // 5. Calculate item total
            double itemTotal =
                    product.getPrice() * cart.getQuantity();

            totalAmount += itemTotal;

            // 6. Reduce product stock
            product.setQuantity(
                    product.getQuantity() - cart.getQuantity()
            );

            productRepository.save(product);

            // 7. Create order item
            OrderItem orderItem = new OrderItem(
                    product.getId(),
                    product.getName(),
                    product.getPrice(),
                    cart.getQuantity(),
                    order
            );

            order.addItem(orderItem);
        }

        // 8. Set final order amount
        order.setTotalAmount(totalAmount);

        // 9. Save order and its items
        Order savedOrder = orderRepository.save(order);

        // 10. Clear customer's cart
        cartRepository.deleteAll(cartItems);

        return savedOrder;
    }

    // Get logged-in customer's orders
    public List<Order> getMyOrders(String userEmail) {

        return orderRepository.findByUserEmail(userEmail);
    }
}
