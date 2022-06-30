package kr.co.automl.domain.metadata.catalog;

import kr.co.automl.domain.metadata.catalog.dto.CreateCatalogAttributes;
import kr.co.automl.domain.metadata.dataset.DataSet;
import lombok.Builder;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode
public class Catalog {

    private long id;

    private Category category;
    private Theme theme;
    private String themeTaxonomy;
    private DataSet dataSet;

    @Builder
    private Catalog(Category category, Theme theme, String themeTaxonomy, DataSet dataSet) {
        this.category = category;
        this.theme = theme;
        this.themeTaxonomy = themeTaxonomy;
        this.dataSet = dataSet;
    }

    public static Catalog create(String categoryName, String themeName, String themeTaxonomy, DataSet dataSet) {
        Category category = Category.ofName(categoryName);
        Theme theme = category.findThemeByName(themeName);

        return Catalog.builder()
                .category(category)
                .theme(theme)
                .themeTaxonomy(themeTaxonomy)
                .dataSet(dataSet)
                .build();
    }

    public static Catalog from(CreateCatalogAttributes createCatalogAttributes) {
        return create(
                createCatalogAttributes.name(),
                createCatalogAttributes.theme(),
                createCatalogAttributes.themeTaxonomy(),
                createCatalogAttributes.dataSet()
        );
    }
}
