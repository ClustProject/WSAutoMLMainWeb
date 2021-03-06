package kr.co.automl.domain.metadata.domain.catalog.dto;

import lombok.Builder;

import javax.validation.constraints.NotBlank;

import static kr.co.automl.domain.metadata.dto.CreateMetaDataAttributes.NOT_BLANK_MESSAGE_SUFFIX;

public record CreateCatalogAttributes(
        @NotBlank(message = "카테고리" + NOT_BLANK_MESSAGE_SUFFIX)
        String categoryName,

        @NotBlank(message = "주제" + NOT_BLANK_MESSAGE_SUFFIX)
        String themeName,

        @NotBlank(message = "주제 분류" + NOT_BLANK_MESSAGE_SUFFIX)
        String themeTaxonomy
) {

    @Builder
    public CreateCatalogAttributes {
    }
}
