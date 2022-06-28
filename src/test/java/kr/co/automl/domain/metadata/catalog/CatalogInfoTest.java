package kr.co.automl.domain.metadata.catalog;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class CatalogInfoTest {

    @Test
    void create_생성_테스트() {
        CatalogInfo catalogInfo = CatalogInfo.create("대기 환경", "공기질", "themeTaxonomy");
        assertThat(catalogInfo).isEqualTo(CatalogInfo.create("대기 환경", "공기질", "themeTaxonomy"));
    }
}
