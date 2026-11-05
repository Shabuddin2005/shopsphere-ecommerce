
package com.shopsphere.repository;

import com.shopsphere.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long> {

    List<Cart> findByUserEmail(String userEmail);

    Cart findByUserEmailAndProductId(String userEmail, Long productId);

    void deleteByUserEmailAndId(String userEmail, Long id);
}
