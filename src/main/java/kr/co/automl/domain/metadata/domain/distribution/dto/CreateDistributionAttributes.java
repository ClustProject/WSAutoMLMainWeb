package kr.co.automl.domain.metadata.domain.distribution.dto;

import lombok.Builder;

public record CreateDistributionAttributes(
        String title,

        String description,

        String downloadUrl,

        String temporalResolution,

        String accurualPeriodicityName,

        String spatial,

        String temporal
) {

    @Builder
    public CreateDistributionAttributes {
    }
}
