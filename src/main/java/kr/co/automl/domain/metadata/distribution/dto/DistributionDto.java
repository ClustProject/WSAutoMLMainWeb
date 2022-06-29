package kr.co.automl.domain.metadata.distribution.dto;

import lombok.Builder;

public record DistributionDto(
        String distribution,
        String timeStamp,
        String accurualPeriodicity,
        String spatial,
        String timeInfo
) {

    @Builder
    public DistributionDto {
    }
}
