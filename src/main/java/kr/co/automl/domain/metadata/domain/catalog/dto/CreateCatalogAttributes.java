package kr.co.automl.domain.metadata.domain.catalog.dto;

import lombok.Builder;

public record CreateCatalogAttributes(
        String name,
        String theme,
        String themeTaxonomy
) {

    @Builder
    public CreateCatalogAttributes {
    }
}
