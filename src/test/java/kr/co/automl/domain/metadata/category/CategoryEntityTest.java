package kr.co.automl.domain.metadata.category;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class CategoryEntityTest {

    @Test
    void create_생성_테스트() {
        CategoryEntity categoryEntity = CategoryEntity.create("대기 환경", "공기질", "themeTaxonomy");

        assertThat(categoryEntity).isEqualTo(CategoryEntity.builder()
                .category(Category.ATMOSPHERIC_ENVIRONMENT)
                .theme(Theme.AIR_QUALITY)
                .themeTaxonomy("themeTaxonomy")
                .build()
        );
    }
}
