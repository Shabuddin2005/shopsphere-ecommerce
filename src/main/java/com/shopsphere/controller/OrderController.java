package com.shopsphere.controller;

import com.shopsphere.entity.Order;
import com.shopsphere.service.OrderService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // Place an order
    @PostMapping
    public ResponseEntity<Order> placeOrder(
            Authentication authentication) {

        String userEmail = authentication.getName();

        Order order = orderService.placeOrder(userEmail);

        return ResponseEntity.ok(order);
    }

    // Get logged-in user's orders
    @GetMapping
    public ResponseEntity<List<Order>> getMyOrders(
            Authentication authentication) {

        String userEmail = authentication.getName();

        List<Order> orders = orderService.getMyOrders(userEmail);

        return ResponseEntity.ok(orders);
    }
}