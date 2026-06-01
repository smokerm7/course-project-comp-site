package com.ms7comp.repository;

import com.ms7comp.entity.RepairRequest;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RepairRequestRepository extends JpaRepository<RepairRequest, Long> {

    @Query("SELECT r FROM RepairRequest r JOIN FETCH r.status WHERE r.client.id = :clientId ORDER BY r.createdAt DESC")
    List<RepairRequest> findByClientIdWithStatus(Long clientId);

    @Query("SELECT r FROM RepairRequest r JOIN FETCH r.status JOIN FETCH r.client ORDER BY r.createdAt DESC")
    List<RepairRequest> findAllWithDetails();

    @Query("SELECT r FROM RepairRequest r JOIN FETCH r.status JOIN FETCH r.client WHERE r.id = :id")
    Optional<RepairRequest> findByIdWithDetails(Long id);
}
