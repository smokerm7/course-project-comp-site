package com.ms7comp.dto;

import jakarta.validation.constraints.NotBlank;

public record CreateRepairRequest(
    @NotBlank String deviceType,
    @NotBlank String deviceModel,
    @NotBlank String problemDescription
) {
}
