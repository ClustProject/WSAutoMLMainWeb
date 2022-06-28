package kr.co.automl.domain.metadata.catalog;

import lombok.EqualsAndHashCode;

@EqualsAndHashCode
public class CatalogEntity {

    private long id;

    private Catalog catalog;
    private Theme theme;
    private String themeTaxonomy;

    CatalogEntity(Catalog catalog, Theme theme, String themeTaxonomy) {
        this.catalog = catalog;
        this.theme = theme;
        this.themeTaxonomy = themeTaxonomy;
    }

    public static CatalogEntity create(String catalogName, String themeName, String themeTaxonomy) {
        Catalog catalog = Catalog.ofName(catalogName);
        Theme theme = catalog.findThemeByName(themeName);

        return new CatalogEntity(catalog, theme, themeTaxonomy);
    }
}
