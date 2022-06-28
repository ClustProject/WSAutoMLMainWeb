package kr.co.automl.domain.metadata.dataset;

import kr.co.automl.domain.metadata.dataset.exceptions.CannotFindMatchContactNameException;
import kr.co.automl.domain.metadata.dataset.exceptions.CannotFindMatchCreatorException;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class CreatorTest {

    @Nested
    class findContactBy_메서드는 {

        @Nested
        class 존재하는_연락처_이름이_주어지면 {

            @Test
            void 찾은_연락처를_리턴한다() {
                Creator creator = Creator.WISE_I_TECH;

                ContactPoint contactPoint = creator.findContactBy("박주영");

                assertThat(contactPoint).isEqualTo(ContactPointTest.CONTACT_POINT1);
            }
        }

        @Nested
        class 존재하지_않는_연락처_이름이_주어지면 {

            @Test
            void CannotFindMatchContactNameException을_던진다() {
                Creator creator = Creator.WISE_I_TECH;

                assertThatThrownBy(() -> creator.findContactBy("xxx"))
                        .isInstanceOf(CannotFindMatchContactNameException.class)
                        .hasMessage("연락처를 찾을 수 없습니다. 연락처 정보를 확인해주세요.");
            }
        }
    }

    @Nested
    class ofName_메서드는 {

        @Nested
        class 존재하는_이름이_주어질경우 {

            @ParameterizedTest
            @ValueSource(strings = {
                    "위세아이텍",
                    "KETI",
                    "케이웨더(주)",
                    "광운대",
                    "고려대"
            })
            void 찾은_생성기관을_리턴한다(String name) {
                assertThat(Creator.ofName(name)).isInstanceOf(Creator.class);
            }
        }

        @Nested
        class 존재하지_않는_이름이_주어질경우 {

            @Test
            void CannotFindMatchCreatorException을_던진다() {
                assertThatThrownBy(() -> Creator.ofName("xxx"))
                        .isInstanceOf(CannotFindMatchCreatorException.class)
                        .hasMessage("생성 기관을 찾을 수 없습니다. 이름을 확인해주세요.");
            }
        }
    }

}
