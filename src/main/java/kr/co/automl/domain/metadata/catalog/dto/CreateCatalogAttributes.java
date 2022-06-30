package kr.co.automl.domain.metadata.catalog.dto;

import kr.co.automl.domain.metadata.dataset.DataSet;
import lombok.Builder;

public record CreateCatalogAttributes(
        String name,
        String theme,
        String themeTaxonomy,
        DataSet dataSet
) {

    @Builder
    public CreateCatalogAttributes {
    }
}
