package kr.co.automl.domain.metadata.domain.catalog;

import kr.co.automl.domain.metadata.domain.catalog.exceptions.CannotFindMatchCategoryException;
import kr.co.automl.domain.metadata.domain.catalog.exceptions.CannotFindMatchThemeException;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class CategoryTest {

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
            void 카테고리를_리턴한다(String existName) {
                Category category = Category.ofName(existName);
                assertThat(category).isInstanceOf(Category.class);
            }
        }

        @Nested
        class 존재하지_않는_이름이_주어질경우 {

            @Test
            void CannotFindMatchCategoryException을_던진다() {
                assertThatThrownBy(() -> Category.ofName("xxx"))
                        .isInstanceOf(CannotFindMatchCategoryException.class)
                        .hasMessage("일치하는 카테고리를 찾을 수 없습니다: xxx");
            }
        }
    }

    @Nested
    class findThemeByName_메서드는 {

        @Nested
        class 존재하는_주제이름이_주어질경우 {

            @Test
            void 찾은_주제를_리턴한다() {
                Category category = Category.CITY;
                Theme theme = category.findThemeByName("방문객");

                assertThat(theme).isEqualTo(Theme.VISITOR);
            }
        }

        @Nested
        class 존재하지않는_주제이름이_주어질경우 {

            @Test
            void CannotFindMatchThemeException을_던진다() {
                Category category = Category.CITY;

                assertThatThrownBy(() -> category.findThemeByName("xxx"))
                        .isInstanceOf(CannotFindMatchThemeException.class)
                        .hasMessage("일치하는 주제를 찾을 수 없습니다: xxx");
            }
        }
    }

    @Nested
    class getName_메서드는 {

        @Test
        void 이름을_리턴한다() {
            Category city = Category.CITY;

            String name = city.getName();

            assertThat(name).isEqualTo("도시");
        }
    }
}
