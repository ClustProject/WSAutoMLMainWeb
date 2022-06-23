package kr.co.automl.domain.metadata;

import kr.co.automl.domain.metadata.exceptions.CannotFindMatchRightsException;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;

class RightTest {

    @Nested
    class matchRight_메서드는 {

        @Nested
        class 일치하는_문자열이_주어진경우 {

            @Test
            void true를_리턴한다() {
                assertThat(Right.CLUST.match("CLUST Consortium")).isTrue();
                assertThat(Right.ALL.match("All")).isTrue();
            }

        }

        @Nested
        class 일치하지_않는_문자열이_주어진경우 {

            @Test
            void false를_리턴한다() {
                assertThat(Right.CLUST.match("xxx")).isFalse();
                assertThat(Right.ALL.match("xxx")).isFalse();
            }

        }
    }

    @Nested
    class ofString_메서드는 {

        @Nested
        class 존재하는_권한_문자열이_주어질경우 {

            @Test
            void 변환된_권한을_리턴한다() {
                assertThat(Right.ofString("CLUST Consortium")).isEqualTo(Right.CLUST);
                assertThat(Right.ofString("All")).isEqualTo(Right.ALL);
            }
        }

        @Nested
        class 존재하지_않는_권한_문자열이_주어질경우 {

            @Test
            void CannotFindMatchRightsException을_던진다() {
                assertThatThrownBy(() -> Right.ofString("xxx"))
                        .isInstanceOf(CannotFindMatchRightsException.class)
                        .hasMessage("일치하는 권한이 없습니다.");
            }
        }
    }
}
