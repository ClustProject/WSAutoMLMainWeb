package kr.co.automl.domain.metadata.catalog;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class CatalogEntityTest {

    @Test
    void create_생성_테스트() {
        CatalogEntity catalogEntity = CatalogEntity.create("대기 환경", "공기질", "themeTaxonomy");

        assertThat(catalogEntity).isEqualTo(new CatalogEntity(
                Catalog.ATMOSPHERIC_ENVIRONMENT, Theme.AIR_QUALITY, "themeTaxonomy")
        );
    }
}
