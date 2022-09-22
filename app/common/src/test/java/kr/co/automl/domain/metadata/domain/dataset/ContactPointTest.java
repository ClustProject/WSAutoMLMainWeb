package kr.co.automl.domain.metadata.domain.dataset;

import kr.co.automl.domain.metadata.dataset.ContactPointFixtures;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class ContactPointTest {

    @Nested
    class matchName_메서드는 {

        @Nested
        class 동일한_이름이_주어질경우 {

            @Test
            void true를_리턴한다() {
                boolean actual = ContactPointFixtures.fixture1().matchName("박주영");

                assertThat(actual).isTrue();
            }
        }

        @Nested
        class 다른_이름이_주어질경우 {

            @Test
            void true를_리턴한다() {
                boolean actual = ContactPointFixtures.fixture1().matchName("xxx");

                assertThat(actual).isFalse();
            }
        }
    }
}
