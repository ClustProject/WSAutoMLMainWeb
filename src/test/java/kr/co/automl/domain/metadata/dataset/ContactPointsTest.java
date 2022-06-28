package kr.co.automl.domain.metadata.dataset;

import kr.co.automl.domain.metadata.dataset.exceptions.CannotFindMatchContactNameException;
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
    class ofWiseITech {

        @Test
        void 위세아이텍_연락처_목록_리턴() {
            ContactPoints contactPoints = ContactPoints.ofWiseITech();

            assertThat(contactPoints).isEqualTo(new ContactPoints(
                    new ContactPoint("김정연", "01089745295", "jykim@wise.co.kr"),
                    new ContactPoint("박주영", "01022983409", "jypark1@wise.co.kr"),
                    new ContactPoint("최태동", "01055854925", "tdchoi@wise.co.kr")
            ));
        }
    }

    @Nested
    class ofKeti {

        @Test
        void 케티_연락처목록_리턴() {
            ContactPoints contactPoints = ContactPoints.ofKeti();

            assertThat(contactPoints).isEqualTo(new ContactPoints(
                    new ContactPoint("문재원", "01098827975", "jaewonoon@gmail.com"),
                    new ContactPoint("오승택", "01048457047", "stoh.keti@gmail.com")
            ));
        }
    }

    @Nested
    class ofKWeather {

        @Test
        void 케이웨더_연락처목록_리턴() {
            ContactPoints contactPoints = ContactPoints.ofKWeather();

            assertThat(contactPoints).isEqualTo(new ContactPoints(
                    new ContactPoint("이인혜", "01085720607", "sakuai0720@gmail.com")
            ));
        }
    }

    @Nested
    class ofKwangwoonUniversity {

        @Test
        void 광운대_연락처목록_리턴() {
            ContactPoints contactPoints = ContactPoints.ofKwangWoonUniversity();

            assertThat(contactPoints).isEqualTo(new ContactPoints(
                    new ContactPoint("김대현", "01050518275", "swslooser@gmail.com")
            ));
        }
    }

    @Nested
    class ofKoreaUniversity {

        @Test
        void 고려대_연락처목록_리턴() {
            ContactPoints contactPoints = ContactPoints.ofKoreaUniversity();

            assertThat(contactPoints).isEqualTo(new ContactPoints(
                    new ContactPoint("이정호", "01065788486", "ljhz123@koreaac.kr"),
                    new ContactPoint("이지윤", "01055095963", "jiyoonlee@koreaac.kr")
            ));
        }
    }

    @Nested
    class ofDaliWorks {

        @Test
        void 달리웍스_연락처목록_리턴() {
            ContactPoints contactPoints = ContactPoints.ofDaliWorks();

            assertThat(contactPoints).isEqualTo(new ContactPoints(
                    new ContactPoint("이순호", "01044230033", "soonho.lee@daliworks.net")
            ));
        }
    }

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
