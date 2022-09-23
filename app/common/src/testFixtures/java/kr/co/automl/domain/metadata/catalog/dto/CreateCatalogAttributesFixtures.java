package kr.co.automl.domain.metadata.catalog.dto;

import kr.co.automl.domain.metadata.domain.catalog.dto.CreateCatalogAttributes;

public class CreateCatalogAttributesFixtures {

    private CreateCatalogAttributesFixtures() {
    }

    public static CreateCatalogAttributes fixture1() {
        return CreateCatalogAttributes.builder()
                .category("대기 환경")
                .theme("공기질")
                .themeTaxonomy("주제 분류")
                .build();
    }
}
