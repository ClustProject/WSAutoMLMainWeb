package kr.co.automl.domain.metadata.domain.distribution;

import kr.co.automl.domain.metadata.domain.distribution.AccurualPeriodicity;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.assertj.core.api.Assertions.assertThat;

class AccurualPeriodicityTest {

    @Nested
    class ofName_메서드는 {

        @Nested
        class 존재하는_배포주기_이름이_주어질경우 {

            @ParameterizedTest
            @ValueSource(strings = {
                    "시간",
                    "일",
                    "주",
                    "월",
                    "Nan"
            })
            void 찾은_배포주기를_리턴한다(String existName) {
                assertThat(AccurualPeriodicity.ofName(existName))
                        .isInstanceOf(AccurualPeriodicity.class);
            }
        }

        @Nested
        class 존재하지않는_배포주기_이름이_주어질경우 {

            @Test
            void nan을_리턴한다() {
                assertThat(AccurualPeriodicity.ofName("xxx"))
                        .isEqualTo(AccurualPeriodicity.NAN);
            }
        }
    }
}
