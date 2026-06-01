package com.ms7comp.dto;

import jakarta.validation.constraints.NotNull;

public record UpdateRepairStatusRequest(
    @NotNull Long statusId,
    String masterComment
) {
}
