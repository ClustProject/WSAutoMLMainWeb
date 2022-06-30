package kr.co.automl.domain.metadata.catalog.dto;

import kr.co.automl.domain.metadata.dataset.DataSetEntity;
import lombok.Builder;

public record CategoryDto(
        String name,
        String theme,
        String themeTaxonomy,
        DataSetEntity dataSet
) {

    @Builder
    public CategoryDto {
    }
}
