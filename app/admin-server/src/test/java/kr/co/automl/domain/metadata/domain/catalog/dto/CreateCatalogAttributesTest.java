package kr.co.automl.domain.metadata.domain.catalog.dto;

public class CreateCatalogAttributesTest {
    public static final CreateCatalogAttributes CREATE_CATALOG_ATTRIBUTES1 = CreateCatalogAttributes.builder()
            .category("대기 환경")
            .theme("공기질")
            .themeTaxonomy("주제 분류")
            .build();
}
