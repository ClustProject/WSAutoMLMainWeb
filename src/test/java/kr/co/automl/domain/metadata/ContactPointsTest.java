package kr.co.automl.domain.metadata;

import kr.co.automl.domain.metadata.exceptions.CannotFindMatchContactNameException;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class ContactPointsTest {
    public ContactPoints CONTACT_POINTS = new ContactPoints(
            ContactPointTest.CONTACT_POINT1,
            ContactPointTest.CONTACT_POINT2
    );


    @Nested
    class findByName {

        @Nested
        class 존재하는_이름이_주어질경우 {

            @Test
            void 찾은_연락처를_리턴한다() {
                ContactPoint contactPoint = ContactPointTest.CONTACT_POINT1;
                String name = contactPoint.name();

                assertThat(CONTACT_POINTS.findByName(name)).isEqualTo(contactPoint);
            }
        }

        @Nested
        class 존재하지_않는_이름이_주어질경우 {

            @Test
            void CannotFindMatchContactNameException을_던진다() {
                assertThatThrownBy(() -> CONTACT_POINTS.findByName("xxx"))
                        .isInstanceOf(CannotFindMatchContactNameException.class)
                        .hasMessage("연락처를 찾을 수 없습니다. 연락처 정보를 확인해주세요.");
            }
        }
    }
}
