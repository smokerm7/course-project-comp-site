package com.ms7comp.dto;

import com.ms7comp.entity.Role;
import java.time.LocalDateTime;

public record UserSummaryDto(
    Long id,
    String username,
    String email,
    Role role,
    LocalDateTime createdAt
) {}
