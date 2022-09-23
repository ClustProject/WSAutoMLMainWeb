package kr.co.automl.global.utils;

import kr.co.automl.domain.metadata.domain.catalog.Category;
import kr.co.automl.domain.metadata.domain.catalog.converter.CategoryConverter;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.ValueSource;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class EntityEnumerableConverterTest {

    private EntityEnumerableConverter<Category> categoryConverter;

    @BeforeEach
    void setUp() {
        this.categoryConverter = new CategoryConverter();
    }

    @Nested
    class convertToDatabaseColumn_메서드는 {

        @Nested
        class null이_주어지면 {

            @Test
            void null을_리턴한다() {
                String actual = categoryConverter.convertToDatabaseColumn(null);

                assertThat(actual).isNull();
            }
        }

        @Nested
        class 열거형_요소가_주어지면 {

            @Test
            void 해당_요소의_이름을_리턴한다() {
                String actual = categoryConverter.convertToDatabaseColumn(Category.CITY);
                assertThat(actual).isEqualTo("도시");

                actual = categoryConverter.convertToDatabaseColumn(Category.OPEN_DATA);
                assertThat(actual).isEqualTo("오픈데이터");
            }

        }
    }


    @Nested
    class convertToEntityAttribute_메서드는 {

        @Nested
        class 빈값이_주어지면 {

            @ParameterizedTest
            @NullAndEmptySource
            @ValueSource(strings = " ")
            void null을_리턴한다(String value) {
                Category actual = categoryConverter.convertToEntityAttribute(value);

                assertThat(actual).isNull();
            }
        }

        @Nested
        class 존재하지않는_요소이름_문자열이_주어질경우 {

            @Test
            void UnsupportedOperationException을_던진다() {
                assertThatThrownBy(() -> categoryConverter.convertToEntityAttribute("xxx"))
                        .isInstanceOf(UnsupportedOperationException.class);
            }
        }

        @Nested
        class 요소이름_문자열이_주어지면 {

            @Test
            void 찾은_열거형_요소를_리턴한다() {
                String dbColumn = "오픈데이터";

                Category category = categoryConverter.convertToEntityAttribute(dbColumn);

                assertThat(category).isEqualTo(Category.OPEN_DATA);
            }
        }
    }
}
