
package com.shopsphere.controller;

import com.shopsphere.entity.Cart;
import com.shopsphere.service.CartService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    // Add product to cart
    @PostMapping
    public ResponseEntity<Cart> addToCart(
            @RequestParam Long productId,
            @RequestParam Integer quantity,
            Authentication authentication) {

        String userEmail = authentication.getName();

        Cart cart = cartService.addToCart(
                userEmail, productId, quantity
        );

        return ResponseEntity.ok(cart);
    }

    // View cart items
    @GetMapping
    public ResponseEntity<List<Cart>> getCart(
            Authentication authentication) {

        String userEmail = authentication.getName();

        return ResponseEntity.ok(
                cartService.getCartItems(userEmail)
        );
    }

    // Remove product from cart
    @DeleteMapping("/{id}")
    public ResponseEntity<String> removeFromCart(
            @PathVariable Long id,
            Authentication authentication) {

        String userEmail = authentication.getName();

        cartService.removeFromCart(userEmail, id);

        return ResponseEntity.ok("Cart item removed successfully");
    }
}
