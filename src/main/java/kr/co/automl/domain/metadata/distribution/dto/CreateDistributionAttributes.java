package kr.co.automl.domain.metadata.distribution.dto;

import lombok.Builder;

public record CreateDistributionAttributes(
        String downloadUrl,
        String timeStamp,
        String accurualPeriodicityName,
        String spatial,
        String temporal
) {

    @Builder
    public CreateDistributionAttributes {
    }
}
