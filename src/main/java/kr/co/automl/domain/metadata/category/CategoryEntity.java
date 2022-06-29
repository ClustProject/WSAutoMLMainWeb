package kr.co.automl.domain.metadata.category;

import kr.co.automl.domain.metadata.category.dto.CategoryDto;
import lombok.Builder;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode
public class CategoryEntity {

    private long id;

    private Category category;
    private Theme theme;
    private String themeTaxonomy;

    @Builder
    private CategoryEntity(Category category, Theme theme, String themeTaxonomy) {
        this.category = category;
        this.theme = theme;
        this.themeTaxonomy = themeTaxonomy;
    }

    public static CategoryEntity create(String categoryName, String themeName, String themeTaxonomy) {
        Category category = Category.ofName(categoryName);
        Theme theme = category.findThemeByName(themeName);

        return CategoryEntity.builder()
                .category(category)
                .theme(theme)
                .themeTaxonomy(themeTaxonomy)
                .build();
    }

    public static CategoryEntity from(CategoryDto categoryDto) {
        return create(
                categoryDto.name(),
                categoryDto.theme(),
                categoryDto.themeTaxonomy()
        );
    }
}
