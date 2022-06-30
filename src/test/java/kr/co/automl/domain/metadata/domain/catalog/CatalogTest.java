package kr.co.automl.domain.metadata.domain.catalog;

import kr.co.automl.domain.metadata.domain.catalog.Catalog;
import kr.co.automl.domain.metadata.domain.catalog.Category;
import kr.co.automl.domain.metadata.domain.catalog.Theme;
import kr.co.automl.domain.metadata.domain.catalog.dto.CreateCatalogAttributes;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class CatalogTest {

    @Test
    void from_생성_테스트() {
        CreateCatalogAttributes createCatalogAttributes = CreateCatalogAttributes.builder()
                .name("대기 환경")
                .theme("공기질")
                .themeTaxonomy("themeTaxonomy")
                .build();

        Catalog catalog = Catalog.from(createCatalogAttributes);

        assertThat(catalog.getCategory()).isEqualTo(Category.ATMOSPHERIC_ENVIRONMENT);
        assertThat(catalog.getTheme()).isEqualTo(Theme.AIR_QUALITY);
        assertThat(catalog.getThemeTaxonomy()).isEqualTo("themeTaxonomy");
    }
}
