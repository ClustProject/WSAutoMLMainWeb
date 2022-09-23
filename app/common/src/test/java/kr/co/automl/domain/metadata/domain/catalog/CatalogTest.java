package kr.co.automl.domain.metadata.domain.catalog;

import kr.co.automl.domain.metadata.catalog.TestCatalogFactory;
import kr.co.automl.domain.metadata.domain.catalog.dto.CatalogResponse;
import kr.co.automl.domain.metadata.domain.catalog.dto.CreateCatalogAttributes;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class CatalogTest {

    @Test
    void from_생성_테스트() {
        CreateCatalogAttributes createCatalogAttributes = CreateCatalogAttributes.builder()
                .category("대기 환경")
                .theme("공기질")
                .themeTaxonomy("themeTaxonomy")
                .build();

        Catalog catalog = Catalog.from(createCatalogAttributes);

        assertThat(catalog.getCategory()).isEqualTo(Category.ATMOSPHERIC_ENVIRONMENT);
        assertThat(catalog.getTheme()).isEqualTo(Theme.AIR_QUALITY);
        assertThat(catalog.getThemeTaxonomy()).isEqualTo("themeTaxonomy");
    }

    @Nested
    class toResponse_메서드는 {

        @Test
        void 변환된_응답객체를_리턴한다() {
            Catalog catalog = TestCatalogFactory.createDefaultFixture();

            CatalogResponse catalogResponse = catalog.toResponse();

            assertThat(catalogResponse).isEqualTo(CatalogResponse.builder()
                    .category("도시")
                    .theme("공기질")
                    .themeTaxonomy("themeTaxonomy")
                    .build());
        }
    }
}
