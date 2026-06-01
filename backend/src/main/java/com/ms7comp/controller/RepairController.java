package com.ms7comp.controller;

import com.ms7comp.dto.CreateRepairRequest;
import com.ms7comp.dto.UpdateRepairStatusRequest;
import com.ms7comp.entity.RepairRequest;
import com.ms7comp.entity.Status;
import com.ms7comp.entity.StatusType;
import com.ms7comp.repository.StatusRepository;
import com.ms7comp.service.RepairService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/repairs")
public class RepairController {

    private final RepairService repairService;
    private final StatusRepository statusRepository;

    public RepairController(RepairService repairService, StatusRepository statusRepository) {
        this.repairService = repairService;
        this.statusRepository = statusRepository;
    }

    @PostMapping
    public RepairRequest create(@Valid @RequestBody CreateRepairRequest request) {
        return repairService.create(request);
    }

    @GetMapping("/my")
    public List<RepairRequest> myRepairs() {
        return repairService.myRepairs();
    }

    @GetMapping("/all")
    public List<RepairRequest> allRepairs() {
        return repairService.allRepairs();
    }

    @GetMapping("/statuses")
    public List<Status> repairStatuses() {
        return statusRepository.findByType(StatusType.REPAIR);
    }

    @PatchMapping("/{id}/status")
    public RepairRequest updateStatus(
        @PathVariable Long id,
        @Valid @RequestBody UpdateRepairStatusRequest request
    ) {
        return repairService.updateStatus(id, request);
    }
}
