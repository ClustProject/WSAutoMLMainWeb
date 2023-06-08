package kr.co.automl.domain.metadata.domain.distribution.dto;

import lombok.Builder;

public record DistributionResponse(
        String title,
        String description,
        String downloadUrl,
        String temporalResolution,
        String accrualPeriodicty,
        String spatial,
        String temporal) {

    @Builder
    public DistributionResponse {
    }
}
