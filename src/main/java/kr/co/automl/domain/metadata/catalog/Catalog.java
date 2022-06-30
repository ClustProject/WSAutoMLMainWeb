package kr.co.automl.domain.metadata.catalog;

import kr.co.automl.domain.metadata.catalog.dto.CreateCatalogAttributes;
import kr.co.automl.domain.metadata.dataset.DataSet;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

@Getter(AccessLevel.PACKAGE)
public class Catalog {

    private long id;

    private Category category;
    private Theme theme;
    private String themeTaxonomy;

    private DataSet dataSet;

    @Builder
    private Catalog(Category category, Theme theme, String themeTaxonomy) {
        this.category = category;
        this.theme = theme;
        this.themeTaxonomy = themeTaxonomy;
    }

    public static Catalog from(CreateCatalogAttributes createCatalogAttributes) {
        Category category = Category.ofName(createCatalogAttributes.name());
        Theme theme = category.findThemeByName(createCatalogAttributes.theme());

        return Catalog.builder()
                .category(category)
                .theme(theme)
                .themeTaxonomy(createCatalogAttributes.themeTaxonomy())
                .build();
    }
}
