package kr.co.automl.domain.metadata.catalog;

import org.junit.jupiter.api.Test;

import static kr.co.automl.domain.metadata.dataset.DataSetEntityTest.DATA_SET1;
import static org.assertj.core.api.Assertions.assertThat;

class CatalogTest {

    @Test
    void create_생성_테스트() {
        Catalog catalog = Catalog.create("대기 환경", "공기질", "themeTaxonomy", DATA_SET1);

        assertThat(catalog).isEqualTo(Catalog.builder()
                .category(Category.ATMOSPHERIC_ENVIRONMENT)
                .theme(Theme.AIR_QUALITY)
                .themeTaxonomy("themeTaxonomy")
                .dataSet(DATA_SET1)
                .build()
        );
    }
}
