package com.ms7comp.controller;

import com.ms7comp.dto.UserSummaryDto;
import com.ms7comp.entity.Order;
import com.ms7comp.entity.User;
import com.ms7comp.repository.UserRepository;
import com.ms7comp.service.OrderService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminDashboardController {

    private final OrderService orderService;
    private final UserRepository userRepository;

    public AdminDashboardController(OrderService orderService, UserRepository userRepository) {
        this.orderService = orderService;
        this.userRepository = userRepository;
    }

    @GetMapping("/orders")
    public List<Order> orders() {
        return orderService.findAllForAdmin();
    }

    @GetMapping("/users")
    public List<UserSummaryDto> users() {
        return userRepository.findAllByOrderByCreatedAtDesc().stream()
            .map(this::toDto)
            .toList();
    }

    private UserSummaryDto toDto(User user) {
        return new UserSummaryDto(user.id, user.username, user.email, user.role, user.createdAt);
    }
}
