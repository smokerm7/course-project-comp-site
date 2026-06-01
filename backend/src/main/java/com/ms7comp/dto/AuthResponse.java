package com.ms7comp.dto;

import com.ms7comp.entity.Role;

public record AuthResponse(
    String token,
    String username,
    Role role
) {
}
