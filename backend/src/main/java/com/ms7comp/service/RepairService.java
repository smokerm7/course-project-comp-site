package com.ms7comp.service;

import com.ms7comp.dto.CreateRepairRequest;
import com.ms7comp.dto.UpdateRepairStatusRequest;
import com.ms7comp.entity.Client;
import com.ms7comp.entity.Employee;
import com.ms7comp.entity.RepairRequest;
import com.ms7comp.entity.Role;
import com.ms7comp.entity.Status;
import com.ms7comp.entity.StatusType;
import com.ms7comp.exception.ApiException;
import com.ms7comp.repository.ClientRepository;
import com.ms7comp.repository.EmployeeRepository;
import com.ms7comp.repository.RepairRequestRepository;
import com.ms7comp.repository.StatusRepository;
import com.ms7comp.security.SecurityUtils;
import com.ms7comp.security.UserPrincipal;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RepairService {

    private final RepairRequestRepository repairRepository;
    private final ClientRepository clientRepository;
    private final EmployeeRepository employeeRepository;
    private final StatusRepository statusRepository;

    public RepairService(
        RepairRequestRepository repairRepository,
        ClientRepository clientRepository,
        EmployeeRepository employeeRepository,
        StatusRepository statusRepository
    ) {
        this.repairRepository = repairRepository;
        this.clientRepository = clientRepository;
        this.employeeRepository = employeeRepository;
        this.statusRepository = statusRepository;
    }

    @Transactional
    public RepairRequest create(CreateRepairRequest request) {
        Client client = clientRepository.findByUserId(SecurityUtils.currentUser().getId())
            .orElseThrow(() -> new ApiException(HttpStatus.FORBIDDEN, "Только клиент может создавать заявку"));

        Status status = statusRepository.findFirstByTypeOrderByIdAsc(StatusType.REPAIR)
            .orElseThrow(() -> new ApiException(HttpStatus.INTERNAL_SERVER_ERROR, "Статус ремонта не настроен"));

        RepairRequest repair = new RepairRequest();
        repair.client = client;
        repair.status = status;
        repair.deviceType = request.deviceType();
        repair.deviceModel = request.deviceModel();
        repair.problemDescription = request.problemDescription();
        return repairRepository.save(repair);
    }

    @Transactional(readOnly = true)
    public List<RepairRequest> myRepairs() {
        Client client = clientRepository.findByUserId(SecurityUtils.currentUser().getId())
            .orElseThrow(() -> new ApiException(HttpStatus.FORBIDDEN, "Профиль клиента не найден"));
        return repairRepository.findByClientIdWithStatus(client.id);
    }

    @Transactional(readOnly = true)
    public List<RepairRequest> allRepairs() {
        return repairRepository.findAllWithDetails();
    }

    @Transactional
    public RepairRequest updateStatus(Long id, UpdateRepairStatusRequest request) {
        RepairRequest repair = repairRepository.findByIdWithDetails(id)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Заявка не найдена"));

        Status status = statusRepository.findById(request.statusId())
            .orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Статус не найден"));

        if (status.type != StatusType.REPAIR) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Недопустимый статус для ремонта");
        }

        UserPrincipal user = SecurityUtils.currentUser();
        if (user.getRole() == Role.EMPLOYEE) {
            Employee employee = employeeRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ApiException(HttpStatus.FORBIDDEN, "Профиль сотрудника не найден"));
            repair.employee = employee;
        }

        repair.status = status;
        if (request.masterComment() != null) {
            repair.masterComment = request.masterComment();
        }
        repair.updatedAt = LocalDateTime.now();
        return repairRepository.save(repair);
    }
}
