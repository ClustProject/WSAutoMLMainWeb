package kr.co.automl.domain.metadata.domain.catalog;

class TestCatalogFactory {
    public static Catalog createDefaultFixture() {
        return Catalog.builder()
                .category(Category.CITY)
                .theme(Theme.AIR_QUALITY)
                .themeTaxonomy("themeTaxonomy")
                .build();
    }
}
