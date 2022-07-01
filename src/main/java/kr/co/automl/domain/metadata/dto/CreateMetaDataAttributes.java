package kr.co.automl.domain.metadata.dto;

import kr.co.automl.domain.metadata.domain.catalog.dto.CreateCatalogAttributes;
import kr.co.automl.domain.metadata.domain.dataset.dto.CreateDataSetAttributes;
import kr.co.automl.domain.metadata.domain.distribution.dto.CreateDistributionAttributes;
import lombok.Builder;

import javax.validation.Valid;

public record CreateMetaDataAttributes(
        @Valid CreateCatalogAttributes createCatalogAttributes,
        @Valid CreateDataSetAttributes createDataSetAttributes,
        @Valid CreateDistributionAttributes createDistributionAttributes
) {

    public static final String NOT_BLANK_MESSAGE_SUFFIX = "(은)는 비어있을 수 없습니다.";

    @Builder
    public CreateMetaDataAttributes {
    }
}
