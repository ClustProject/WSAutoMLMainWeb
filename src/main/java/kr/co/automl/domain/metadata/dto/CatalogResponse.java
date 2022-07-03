package kr.co.automl.domain.metadata.dto;

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
