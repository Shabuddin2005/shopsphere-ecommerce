
package com.shopsphere.service;

import com.shopsphere.entity.Cart;
import com.shopsphere.repository.CartRepository;
import com.shopsphere.repository.ProductRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    public CartService(
            CartRepository cartRepository,
            ProductRepository productRepository) {

        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
    }

    public Cart addToCart(String userEmail, Long productId, Integer quantity) {

        if (quantity == null || quantity <= 0) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Quantity must be greater than zero"
            );
        }

        productRepository.findById(productId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Product not found"
                ));

        Cart existingCart = cartRepository
                .findByUserEmailAndProductId(userEmail, productId);

        if (existingCart != null) {
            existingCart.setQuantity(
                    existingCart.getQuantity() + quantity
            );

            return cartRepository.save(existingCart);
        }

        Cart cart = new Cart(userEmail, productId, quantity);

        return cartRepository.save(cart);
    }

    public List<Cart> getCartItems(String userEmail) {
        return cartRepository.findByUserEmail(userEmail);
    }

    public void removeFromCart(String userEmail, Long cartId) {

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Cart item not found"
                ));

        if (!cart.getUserEmail().equals(userEmail)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "You cannot remove another user's cart item"
            );
        }

        cartRepository.delete(cart);
    }
}
