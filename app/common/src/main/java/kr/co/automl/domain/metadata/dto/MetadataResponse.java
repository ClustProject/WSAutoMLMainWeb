package kr.co.automl.domain.metadata.dto;

import kr.co.automl.domain.metadata.domain.catalog.dto.CatalogResponse;
import kr.co.automl.domain.metadata.domain.dataset.DataSet;
import kr.co.automl.domain.metadata.domain.dataset.dto.DataSetResponse;
import kr.co.automl.domain.metadata.domain.distribution.dto.DistributionResponse;
import lombok.Builder;

public record MetadataResponse(
        CatalogResponse catalog,
        DataSetResponse dataSet,
        DistributionResponse distribution) {

    @Builder
    public MetadataResponse {
    }

    public static MetadataResponse from(DataSet dataSet) {
        return MetadataResponse.builder()
                .catalog(dataSet.toCatalogResponse())
                .dataSet(dataSet.toResponse())
                .distribution(dataSet.toDistributionResponse())
                .build();
    }
}
