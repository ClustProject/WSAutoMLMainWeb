package kr.co.automl.domain.metadata.domain.catalog.dto;

import lombok.Builder;

import javax.validation.constraints.NotBlank;

import static kr.co.automl.domain.metadata.dto.CreateMetaDataAttributes.NOT_BLANK_MESSAGE_SUFFIX;

public record CreateCatalogAttributes(
        @NotBlank(message = "카테고리" + NOT_BLANK_MESSAGE_SUFFIX)
        String category,

        @NotBlank(message = "주제" + NOT_BLANK_MESSAGE_SUFFIX)
        String theme,

        String themeTaxonomy
) {

    @Builder
    public CreateCatalogAttributes {
    }
}
