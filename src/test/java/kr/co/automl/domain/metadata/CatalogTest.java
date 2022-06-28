package kr.co.automl.domain.metadata;

import kr.co.automl.domain.metadata.exceptions.CannotFindMatchCatalogException;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class CatalogTest {

    @Nested
    class ofName_메서드는 {

        @Nested
        class 존재하는_이름이_주어질경우 {

            @ParameterizedTest
            @ValueSource(strings = {
                    "대기 환경",
                    "농장",
                    "공장",
                    "생체",
                    "생활/영상",
                    "에너지",
                    "환경",
                    "도시",
                    "오픈데이터"
            })
            void 카탈로그를_리턴한다(String existName) {
                Catalog catalog = Catalog.ofName(existName);
                assertThat(catalog).isInstanceOf(Catalog.class);
            }
        }

        @Nested
        class 존재하지_않는_이름이_주어질경우 {

            @Test
            void CannotFindMatchCatalogException을_던진다() {
                assertThatThrownBy(() -> Catalog.ofName("xxx"))
                        .isInstanceOf(CannotFindMatchCatalogException.class)
                        .hasMessage("일치하는 카탈로그를 찾을 수 없습니다: xxx");
            }
        }
    }
}
