package kr.co.automl.domain.metadata;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class ContactPointTest {
    public static final ContactPoint CONTACT_POINT1 = new ContactPoint("박주영", "jypark1@wise.co.kr", "01022983409");
    public static final ContactPoint CONTACT_POINT2 = new ContactPoint("최태동", "tdchoi@wise.co.kr", "01055854925");

    @Nested
    class matchName_메서드는 {

        @Nested
        class 동일한_이름이_주어질경우 {

            @Test
            void true를_리턴한다() {
                boolean actual = CONTACT_POINT1.matchName("박주영");

                assertThat(actual).isTrue();
            }
        }

        @Nested
        class 다른_이름이_주어질경우 {

            @Test
            void true를_리턴한다() {
                boolean actual = CONTACT_POINT1.matchName("xxx");

                assertThat(actual).isFalse();
            }
        }
    }
}
