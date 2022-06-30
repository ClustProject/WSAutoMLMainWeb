package kr.co.automl.domain.metadata.catalog.dto;

import lombok.Builder;

public record CategoryDto(
        String name,
        String theme,
        String themeTaxonomy
) {

    @Builder
    public CategoryDto {
    }
}
