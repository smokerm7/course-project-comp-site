package com.ms7comp.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    public Category category;

    @Column(nullable = false)
    public String name;

    public String description;
    public String manufacturer;

    @Column(nullable = false)
    public BigDecimal price;

    @Column(name = "stock_quantity", nullable = false)
    public Integer stockQuantity = 0;

    @Column(name = "image_url")
    public String imageUrl;

    @Column(name = "created_at")
    public LocalDateTime createdAt = LocalDateTime.now();
}
