package kr.co.automl.domain.metadata;

import kr.co.automl.domain.metadata.exceptions.CannotFindMatchThemeException;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;
import org.junit.jupiter.params.provider.ValueSource;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class ThemeTest {

    @Nested
    class of_메서드는 {

        @Nested
        class 존재하는_주제_이름이_주어질경우 {

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
            void 찾은_주제를_리턴한다(String existName) {
                assertThat(Theme.of(existName))
                        .isInstanceOf(Theme.class);
            }
        }

        @Nested
        class 존재하지않는_주제_이름이_주어질경우 {

            @Test
            void CannotFindMatchThemeException을_던진다() {
                assertThatThrownBy(() -> Theme.of("xxx"))
                        .isInstanceOf(CannotFindMatchThemeException.class);
            }

        }
    }

    @Nested
    class matchName_메서드는 {

        @Nested
        class 일치하는_이름이_주어진경우 {

            @ParameterizedTest
            @EnumSource(Theme.class)
            void true를_리턴한다(Theme theme) {
                String name = theme.getName();
                assertThat(theme.matchName(name)).isTrue();
            }

        }

        @Nested
        class 일치하지않는_이름이_주어진경우 {

            @ParameterizedTest
            @EnumSource(Theme.class)
            void false를_리턴한다(Theme theme) {
                assertThat(theme.matchName("xxx")).isFalse();
            }

        }

    }
}
