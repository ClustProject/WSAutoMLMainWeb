package kr.co.automl.domain.metadata.dataset;

import kr.co.automl.domain.metadata.exceptions.CannotFindMatchRightsException;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatIllegalArgumentException;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;

class LicenseTest {

    @Nested
    class ofㅜ므 {

    }

    @Nested
    class of_메서드는 {

        @Nested
        class 존재하지_않는_라이센스_이름이_주어질경우 {

            @Test
            void IllegalArgumentException을_던진다() {
                assertThatIllegalArgumentException()
                        .isThrownBy(() -> License.of("xxx", "xxx"));
            }

        }

        @Nested
        class 존재하지_않는_권한이_주어질경우 {

            @ParameterizedTest
            @EnumSource(License.class)
            void IllegalArgumentException을_던진다(License license) {
                assertThatThrownBy(() -> {
                    License.of(license.toString(), "xxx");
                })
                        .isInstanceOf(CannotFindMatchRightsException.class)
                        .hasMessage("일치하는 권한이 없습니다.");
            }

        }

        @Nested
        class 존재하는_권한이_주어질경우 {

            @Test
            void 라이센스를_리턴한다() {
                assertThat(License.of("CLUST", "CLUST Consortium"))
                        .isEqualTo(License.CLUST);
                assertThat(License.of("PUBLIC", "All"))
                        .isEqualTo(License.PUBLIC);
            }
        }
    }

    @Nested
    class contains_메서드는 {

        @Nested
        class 존재하는_권한이_주어질경우 {

            @Test
            void true를_리턴한다() {
                assertThat(License.CLUST.contains("CLUST Consortium")).isTrue();
                assertThat(License.CLUST.contains("All")).isTrue();
                assertThat(License.PUBLIC.contains("All")).isTrue();
            }

        }

        @Nested
        class 존재하지_않는_권한이_주어질경우 {

            @Test
            void false를_리턴한다() {
                assertThat(License.CLUST.contains("xxx")).isFalse();
                assertThat(License.PUBLIC.contains("xxx")).isFalse();
            }

        }
    }
}

