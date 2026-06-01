package com.ms7comp.service;

import com.ms7comp.dto.ProductRequest;
import com.ms7comp.entity.Category;
import com.ms7comp.entity.Product;
import com.ms7comp.exception.ApiException;
import com.ms7comp.repository.CategoryRepository;
import com.ms7comp.repository.ProductRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<Product> findAll(Long categoryId) {
        if (categoryId == null) {
            return productRepository.findAllWithCategory();
        }
        return productRepository.findAllByCategoryId(categoryId);
    }

    public Product findById(Long id) {
        return productRepository.findById(id)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Товар не найден"));
    }

    @Transactional
    public Product create(ProductRequest request) {
        Product product = new Product();
        apply(product, request);
        return productRepository.save(product);
    }

    @Transactional
    public Product update(Long id, ProductRequest request) {
        Product product = findById(id);
        apply(product, request);
        return productRepository.save(product);
    }

    @Transactional
    public void delete(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ApiException(HttpStatus.NOT_FOUND, "Товар не найден");
        }
        productRepository.deleteById(id);
    }

    private void apply(Product product, ProductRequest request) {
        Category category = categoryRepository.findById(request.categoryId())
            .orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Категория не найдена"));
        product.category = category;
        product.name = request.name();
        product.description = request.description();
        product.manufacturer = request.manufacturer();
        product.price = request.price();
        product.stockQuantity = request.stockQuantity();
        product.imageUrl = request.imageUrl();
    }
}
