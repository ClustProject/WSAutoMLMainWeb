package kr.co.automl.domain.metadata.catalog;

import kr.co.automl.domain.metadata.catalog.dto.CatalogDto;
import lombok.Builder;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode
public class CatalogEntity {

    private long id;

    private Catalog catalog;
    private Theme theme;
    private String themeTaxonomy;

    @Builder
    private CatalogEntity(Catalog catalog, Theme theme, String themeTaxonomy) {
        this.catalog = catalog;
        this.theme = theme;
        this.themeTaxonomy = themeTaxonomy;
    }

    public static CatalogEntity create(String catalogName, String themeName, String themeTaxonomy) {
        Catalog catalog = Catalog.ofName(catalogName);
        Theme theme = catalog.findThemeByName(themeName);

        return CatalogEntity.builder()
                .catalog(catalog)
                .theme(theme)
                .themeTaxonomy(themeTaxonomy)
                .build();
    }

    public static CatalogEntity from(CatalogDto catalogDto) {
        return create(
                catalogDto.name(),
                catalogDto.theme(),
                catalogDto.themeTaxonomy()
        );
    }
}
