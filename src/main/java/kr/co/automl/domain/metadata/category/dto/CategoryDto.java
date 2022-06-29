package kr.co.automl.domain.metadata.category.dto;

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
