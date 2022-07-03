package kr.co.automl.domain.metadata.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;

public record MetadataResponse(
        String category,
        String theme,
        String themeTaxonomy,
        String title,
        String publisher,
        String creator,
        String contactPointName,
        String contactPointEmail,
        String type,
        String keyword,
        String license,
        String rights,
        String description,
        String distributionTitle,
        String distributionDescription,
        String downloadUrl,
        String temporalResolution,
        String accurualPeriodicity,
        String spatial,
        String temporal
) {

    @Builder
    @QueryProjection
    public MetadataResponse {
    }
}
