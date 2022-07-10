package kr.co.automl.domain.metadata.domain.dataset;

import kr.co.automl.domain.metadata.domain.dataset.exceptions.CannotFindMatchRightsException;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;

class RightsTest {

    @Nested
    class match_메서드는 {

        @Nested
        class 일치하는_권한_이름이_주어진경우 {

            @Test
            void true를_리턴한다() {
                assertThat(Rights.CLUST.match("CLUST Consortium")).isTrue();
                assertThat(Rights.ALL.match("All")).isTrue();
            }

        }

        @Nested
        class 일치하지_않는_권한_이름이_주어진경우 {

            @Test
            void false를_리턴한다() {
                assertThat(Rights.CLUST.match("xxx")).isFalse();
                assertThat(Rights.ALL.match("xxx")).isFalse();
            }

        }
    }

    @Nested
    class ofString_메서드는 {

        @Nested
        class 존재하는_권한_이름이_주어질경우 {

            @Test
            void 변환된_권한을_리턴한다() {
                assertThat(Rights.ofName("CLUST Consortium")).isEqualTo(Rights.CLUST);
                assertThat(Rights.ofName("All")).isEqualTo(Rights.ALL);
            }
        }

        @Nested
        class 존재하지_않는_권한_이름이_주어질경우 {

            @Test
            void CannotFindMatchRightsException을_던진다() {
                assertThatThrownBy(() -> Rights.ofName("xxx"))
                        .isInstanceOf(CannotFindMatchRightsException.class)
                        .hasMessage("일치하는 권한이 없습니다: xxx");
            }
        }
    }
}
