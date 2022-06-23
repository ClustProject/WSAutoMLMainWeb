package kr.co.automl.domain.metadata;

import kr.co.automl.domain.metadata.exceptions.CannotFindMatchThemeTaxonomyException;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;
import org.junit.jupiter.params.provider.ValueSource;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class ThemeTaxonomyTest {

    @Nested
    class of_메서드는 {

        @Nested
        class 존재하는_주제분류_이름이_주어질경우 {

            @ParameterizedTest
            @ValueSource(strings = {
                    "농장 상황",
                    "공장모터",
                    "건설장비",
                    "작업자 체온",
                    "음성",
                    "움직임",
                    "맥파",
                    "활동영상",
                    "태양광",
                    "실외대기",
                    "방문객",
                    "국내교통"
            })
            void 주제분류를_리턴한다(String name) {
                assertThat(ThemeTaxonomy.of(name))
                        .isInstanceOf(ThemeTaxonomy.class);
            }
        }

        @Nested
        class 존재하지않는_주제분류_이름이_주어질경우 {

            @Test
            void CannotFindMatchThemeTaxonomyException을_던진다() {
                assertThatThrownBy(() -> ThemeTaxonomy.of("xxx"))
                        .isInstanceOf(CannotFindMatchThemeTaxonomyException.class);
            }

        }
    }

    @Nested
    class matchName_메서드는 {

        @Nested
        class 일치하는_이름이_주어진경우 {

            @ParameterizedTest
            @EnumSource(ThemeTaxonomy.class)
            void true를_리턴한다(ThemeTaxonomy themeTaxonomy) {
                String name = themeTaxonomy.getName();
                assertThat(themeTaxonomy.matchName(name)).isTrue();
            }

        }

        @Nested
        class 일치하지않는_이름이_주어진경우 {

            @ParameterizedTest
            @EnumSource(ThemeTaxonomy.class)
            void false를_리턴한다(ThemeTaxonomy themeTaxonomy) {
                assertThat(themeTaxonomy.matchName("xxx")).isFalse();
            }

        }

    }
}
