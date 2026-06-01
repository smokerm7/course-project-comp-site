package com.ms7comp.service;

import com.ms7comp.dto.CreateOrderRequest;
import com.ms7comp.dto.OrderItemRequest;
import com.ms7comp.entity.Client;
import com.ms7comp.entity.Order;
import com.ms7comp.entity.OrderItem;
import com.ms7comp.entity.Product;
import com.ms7comp.entity.Status;
import com.ms7comp.entity.StatusType;
import com.ms7comp.exception.ApiException;
import com.ms7comp.repository.ClientRepository;
import com.ms7comp.repository.OrderRepository;
import com.ms7comp.repository.ProductRepository;
import com.ms7comp.repository.StatusRepository;
import com.ms7comp.security.SecurityUtils;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ClientRepository clientRepository;
    private final ProductRepository productRepository;
    private final StatusRepository statusRepository;

    public OrderService(
        OrderRepository orderRepository,
        ClientRepository clientRepository,
        ProductRepository productRepository,
        StatusRepository statusRepository
    ) {
        this.orderRepository = orderRepository;
        this.clientRepository = clientRepository;
        this.productRepository = productRepository;
        this.statusRepository = statusRepository;
    }

    @Transactional
    public Order create(CreateOrderRequest request) {
        Client client = clientRepository.findByUserId(SecurityUtils.currentUser().getId())
            .orElseThrow(() -> new ApiException(HttpStatus.FORBIDDEN, "Профиль клиента не найден"));

        Status status = statusRepository.findFirstByTypeOrderByIdAsc(StatusType.ORDER)
            .orElseThrow(() -> new ApiException(HttpStatus.INTERNAL_SERVER_ERROR, "Статус заказа не настроен"));

        Order order = new Order();
        order.client = client;
        order.status = status;
        order.deliveryAddress = request.deliveryAddress();

        BigDecimal total = BigDecimal.ZERO;
        for (OrderItemRequest itemRequest : request.items()) {
            Product product = productRepository.findById(itemRequest.productId())
                .orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Товар не найден: " + itemRequest.productId()));

            if (product.stockQuantity < itemRequest.quantity()) {
                throw new ApiException(HttpStatus.BAD_REQUEST, "Недостаточно товара на складе: " + product.name);
            }

            OrderItem item = new OrderItem();
            item.order = order;
            item.product = product;
            item.quantity = itemRequest.quantity();
            item.price = product.price;
            order.items.add(item);

            product.stockQuantity -= itemRequest.quantity();
            total = total.add(product.price.multiply(BigDecimal.valueOf(itemRequest.quantity())));
        }

        order.totalAmount = total;
        return orderRepository.save(order);
    }

    @Transactional(readOnly = true)
    public List<Order> myOrders() {
        Client client = clientRepository.findByUserId(SecurityUtils.currentUser().getId())
            .orElseThrow(() -> new ApiException(HttpStatus.FORBIDDEN, "Профиль клиента не найден"));
        return orderRepository.findByClientIdWithDetails(client.id);
    }

    @Transactional(readOnly = true)
    public List<Order> findAllForAdmin() {
        return orderRepository.findAllWithDetails();
    }
}
