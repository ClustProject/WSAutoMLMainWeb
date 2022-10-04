package kr.co.automl.domain.metadata.catalog;

import kr.co.automl.domain.metadata.domain.catalog.Catalog;
import kr.co.automl.domain.metadata.domain.catalog.Category;
import kr.co.automl.domain.metadata.domain.catalog.Theme;

public class TestCatalogFactory {

    private TestCatalogFactory() {
    }

    public static Catalog createDefaultFixture() {
        return Catalog.builder()
                .category(Category.CITY)
                .theme(Theme.AIR_QUALITY)
                .themeTaxonomy("themeTaxonomy")
                .build();
    }

    public static Catalog createWithCategory(Category category) {
        Theme theme = category.findAnyTheme();

        return Catalog.builder()
                .category(category)
                .theme(theme)
                .themeTaxonomy("themeTaxonomy")
                .build();
    }
}
