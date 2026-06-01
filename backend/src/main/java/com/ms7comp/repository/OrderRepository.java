package com.ms7comp.repository;

import com.ms7comp.entity.Order;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("SELECT o FROM Order o JOIN FETCH o.status JOIN FETCH o.items i JOIN FETCH i.product WHERE o.client.id = :clientId ORDER BY o.orderDate DESC")
    List<Order> findByClientIdWithDetails(Long clientId);

    @Query("SELECT DISTINCT o FROM Order o JOIN FETCH o.status JOIN FETCH o.client LEFT JOIN FETCH o.items i LEFT JOIN FETCH i.product ORDER BY o.orderDate DESC")
    List<Order> findAllWithDetails();
}
