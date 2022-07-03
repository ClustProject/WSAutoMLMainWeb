package kr.co.automl.domain.metadata.domain.catalog;

import kr.co.automl.domain.metadata.domain.catalog.dto.CreateCatalogAttributes;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class CatalogTest {

    public static Catalog createDefaultFixture() {
        return Catalog.builder()
                .category(Category.CITY)
                .theme(Theme.AIR_QUALITY)
                .themeTaxonomy("themeTaxonomy")
                .build();
    }

    @Test
    void from_생성_테스트() {
        CreateCatalogAttributes createCatalogAttributes = CreateCatalogAttributes.builder()
                .categoryName("대기 환경")
                .themeName("공기질")
                .themeTaxonomy("themeTaxonomy")
                .build();

        Catalog catalog = Catalog.from(createCatalogAttributes);

        assertThat(catalog.getCategory()).isEqualTo(Category.ATMOSPHERIC_ENVIRONMENT);
        assertThat(catalog.getTheme()).isEqualTo(Theme.AIR_QUALITY);
        assertThat(catalog.getThemeTaxonomy()).isEqualTo("themeTaxonomy");
    }
}
