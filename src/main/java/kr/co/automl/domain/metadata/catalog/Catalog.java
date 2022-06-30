package kr.co.automl.domain.metadata.catalog;

import kr.co.automl.domain.metadata.catalog.dto.CategoryDto;
import lombok.Builder;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode
public class Catalog {

    private long id;

    private Category category;
    private Theme theme;
    private String themeTaxonomy;

    @Builder
    private Catalog(Category category, Theme theme, String themeTaxonomy) {
        this.category = category;
        this.theme = theme;
        this.themeTaxonomy = themeTaxonomy;
    }

    public static Catalog create(String categoryName, String themeName, String themeTaxonomy) {
        Category category = Category.ofName(categoryName);
        Theme theme = category.findThemeByName(themeName);

        return Catalog.builder()
                .category(category)
                .theme(theme)
                .themeTaxonomy(themeTaxonomy)
                .build();
    }

    public static Catalog from(CategoryDto categoryDto) {
        return create(
                categoryDto.name(),
                categoryDto.theme(),
                categoryDto.themeTaxonomy()
        );
    }
}
