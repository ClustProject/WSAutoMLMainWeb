package kr.co.automl.domain.metadata.domain.dataset;

import kr.co.automl.domain.metadata.domain.dataset.exceptions.CannotFindMatchRightsException;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;

class LicenseTest {

    @Nested
    class findRightsByName_메서드는 {

        @Nested
        class 존재하는_권한_이름이_주어질경우 {

            @Test
            void 찾은_권한을_리턴한다() {
                License license = License.CLUST;

                Rights rights = license.findRightsByName("CLUST Consortium");

                assertThat(rights).isInstanceOf(Rights.class);
            }
        }

        @Nested
        class 존재하지않는_권한_이름이_주어진경우 {

            @ParameterizedTest
            @EnumSource(License.class)
            void CannotFindMatchRightsException을_던진다(License license) {
                assertThatThrownBy(() -> license.findRightsByName("xxx"))
                        .isInstanceOf(CannotFindMatchRightsException.class)
                        .hasMessage("일치하는 권한이 없습니다: xxx");
            }
        }
    }
}

