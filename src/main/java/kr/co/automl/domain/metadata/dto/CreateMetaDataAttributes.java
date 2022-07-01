package kr.co.automl.domain.metadata.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import kr.co.automl.domain.metadata.domain.catalog.dto.CreateCatalogAttributes;
import kr.co.automl.domain.metadata.domain.dataset.dto.CreateDataSetAttributes;
import kr.co.automl.domain.metadata.domain.distribution.dto.CreateDistributionAttributes;
import lombok.Builder;

import javax.validation.Valid;

public record CreateMetaDataAttributes(
        @JsonProperty("catalog") @Valid CreateCatalogAttributes createCatalogAttributes,
        @JsonProperty("dataset") @Valid CreateDataSetAttributes createDataSetAttributes,
        @JsonProperty("distribution") @Valid CreateDistributionAttributes createDistributionAttributes
) {

    public static final String NOT_BLANK_MESSAGE_SUFFIX = "(은)는 비어있을 수 없습니다.";

    @Builder
    public CreateMetaDataAttributes {
    }
}
