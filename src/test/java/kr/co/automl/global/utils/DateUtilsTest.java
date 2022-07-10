package kr.co.automl.global.utils;

import org.joda.time.DateTime;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class DateUtilsTest {

    @Nested
    class getFormattedDateString_메서드는 {

        @Test
        void 포맷된_날짜_문자열을_리턴한다() {
            DateTime datetime = new DateTime(2022, 7, 10, 14, 49, 30);

            String dateString = DateUtils.getFormattedDateString(datetime);

            assertThat(dateString).isEqualTo(
                    "20220710-144930"
            );
        }
    }
}
