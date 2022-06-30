package kr.co.automl.domain.metadata.catalog;

import kr.co.automl.domain.metadata.catalog.converter.CatagoryConverter;
import kr.co.automl.domain.metadata.catalog.converter.ThemeConverter;
import kr.co.automl.domain.metadata.catalog.dto.CreateCatalogAttributes;
import kr.co.automl.domain.metadata.dataset.DataSet;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter(AccessLevel.PACKAGE)
@NoArgsConstructor(access = PROTECTED)
public class Catalog {

    @Id
    @GeneratedValue
    @Column(name = "catalog_id")
    private long id;

    @Convert(converter = CatagoryConverter.class)
    private Category category;

    @Convert(converter = ThemeConverter.class)
    private Theme theme;

    private String themeTaxonomy;

    @OneToOne(mappedBy = "catalog")
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
