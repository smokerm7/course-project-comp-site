package com.ms7comp.repository;

import com.ms7comp.entity.Status;
import com.ms7comp.entity.StatusType;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository extends JpaRepository<Status, Long> {

    List<Status> findByType(StatusType type);

    Optional<Status> findByNameAndType(String name, StatusType type);

    Optional<Status> findFirstByTypeOrderByIdAsc(StatusType type);
}
