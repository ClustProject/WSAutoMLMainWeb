package kr.co.automl.domain.metadata.dto;

import lombok.Builder;

public record DistributionResponse(
        String title,
        String description,
        String downloadUrl,
        String temporalResolution,
        String accurualPeriodicity,
        String spatial,
        String temporal
) {

    @Builder
    public DistributionResponse {
    }
}
