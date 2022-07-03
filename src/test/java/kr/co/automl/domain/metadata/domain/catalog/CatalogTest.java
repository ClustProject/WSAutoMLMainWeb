package kr.co.automl.domain.metadata.domain.catalog;

import kr.co.automl.domain.metadata.domain.catalog.dto.CreateCatalogAttributes;
import kr.co.automl.domain.metadata.dto.CatalogResponse;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class CatalogTest {

    public static Catalog createFixture() {
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

    @Nested
    class toResponse_메서드는 {

        @Test
        void 변환된_응답객체를_리턴한다() {
            Catalog catalog = createFixture();

            CatalogResponse catalogResponse = catalog.toResponse();

            assertThat(catalogResponse).isEqualTo(CatalogResponse.builder()
                    .category("도시")
                    .theme("공기질")
                    .themeTaxonomy("themeTaxonomy")
                    .build());
        }
    }
}
