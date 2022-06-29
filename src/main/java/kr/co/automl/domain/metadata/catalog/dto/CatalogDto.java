package kr.co.automl.domain.metadata.catalog.dto;

import lombok.Builder;

public record CatalogDto(
        String name,
        String theme,
        String themeTaxonomy
) {

    @Builder
    public CatalogDto {
    }
}
