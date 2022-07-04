package kr.co.automl.domain.metadata.domain.catalog.dto;

import lombok.Builder;

public record CatalogResponse(
        String category,
        String theme,
        String themeTaxonomy
) {

    @Builder
    public CatalogResponse {
    }
}
