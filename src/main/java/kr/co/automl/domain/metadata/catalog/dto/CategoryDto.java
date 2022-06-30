package kr.co.automl.domain.metadata.catalog.dto;

import kr.co.automl.domain.metadata.dataset.DataSet;
import lombok.Builder;

public record CategoryDto(
        String name,
        String theme,
        String themeTaxonomy,
        DataSet dataSet
) {

    @Builder
    public CategoryDto {
    }
}
