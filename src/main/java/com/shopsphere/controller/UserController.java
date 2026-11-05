package com.shopsphere.controller;

import com.shopsphere.dto.UserRequest;
import com.shopsphere.dto.UserResponse;
import com.shopsphere.dto.LoginRequest;
import com.shopsphere.dto.LoginResponse;
import com.shopsphere.service.UserService;

import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // USER REGISTRATION API
    @PostMapping("/register")
    public UserResponse registerUser(
            @Valid @RequestBody UserRequest request) {

        return userService.registerUser(request);
    }

    // USER LOGIN API
    @PostMapping("/login")
    public LoginResponse loginUser(
            @Valid @RequestBody LoginRequest request) {

        return userService.loginUser(request);
    }
}