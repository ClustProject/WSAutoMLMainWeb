package kr.co.automl.domain.metadata;

import kr.co.automl.domain.metadata.catalog.Theme;
import kr.co.automl.domain.metadata.exceptions.CannotFindMatchThemeException;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class ThemeTest {

    @Nested
    class ofName_메서드는 {

        @Nested
        class 존재하는_주제_이름이_주어질경우 {

            @ParameterizedTest
            @ValueSource(strings = {
                    "공기질",
                    "농장 환경",
                    "공장모터",
                    "건설장비",
                    "작업자",
                    "음성",
                    "움직임",
                    "생체 데이터",
                    "활동영상",
                    "태양광",
                    "전력",
                    "실외대기",
                    "방문객",
                    "교통",
                    "캘린더"
            })
            void 찾은_주제를_리턴한다(String existName) {
                assertThat(Theme.ofName(existName))
                        .isInstanceOf(Theme.class);
            }
        }

        @Nested
        class 존재하지않는_주제_이름이_주어질경우 {

            @Test
            void CannotFindMatchThemeException을_던진다() {
                assertThatThrownBy(() -> Theme.ofName("xxx"))
                        .isInstanceOf(CannotFindMatchThemeException.class)
                        .hasMessage("일치하는 주제를 찾을 수 없습니다: xxx");
            }

        }
    }
}
