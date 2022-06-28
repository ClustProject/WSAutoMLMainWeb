package kr.co.automl.domain.metadata.dataset;

import kr.co.automl.domain.metadata.dataset.exceptions.CannotFindMatchTypeException;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class TypeTest {

    @Nested
    class ofName_메서드는 {

        @Nested
        class 존재하는_이름이_주어질경우 {

            @ParameterizedTest
            @ValueSource(strings = {
                    "이미지",
                    "비디오",
                    "텍스트",
                    "숫자"
            })
            void 타입을_리턴한다(String typeName) {
                Type type = Type.ofName(typeName);
                assertThat(type).isInstanceOf(Type.class);
            }
        }

        @Nested
        class 존재하지않는_이름이_주어질경우 {

            @Test
            void CannotFindMatchTypeException을_던진다() {
                assertThatThrownBy(() -> Type.ofName("xxx"))
                        .isInstanceOf(CannotFindMatchTypeException.class)
                        .hasMessage("일치하는 매체 유형을 찾을 수 없습니다: xxx");
            }
        }
    }
}
