package kr.co.automl.domain.metadata.domain.catalog;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;

import static org.assertj.core.api.Assertions.assertThat;

class ThemeTest {

    @Nested
    class matchName_메서드는 {

        @Nested
        class 일치하는_이름이_주어진경우 {

            @ParameterizedTest
            @EnumSource(Theme.class)
            void true를_리턴한다(Theme theme) {
                String themeName = theme.getName();

                boolean actual = theme.matchName(themeName);

                assertThat(actual).isTrue();
            }
        }

        @Nested
        class 일치하지않는_이름이_주어진경우 {

            @ParameterizedTest
            @EnumSource(Theme.class)
            void false를_리턴한다(Theme theme) {
                boolean actual = theme.matchName("xxx");

                assertThat(actual).isFalse();
            }
        }
    }

    @Nested
    class getName_메서드는 {

        @Test
        void 이름을_리턴한다() {
            Theme airQuality = Theme.AIR_QUALITY;

            String name = airQuality.getName();

            assertThat(name).isEqualTo("공기질");
        }
    }
}
