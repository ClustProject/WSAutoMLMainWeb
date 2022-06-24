package kr.co.automl.domain.user;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;

import static org.assertj.core.api.Assertions.assertThat;

class RoleTest {

    @Nested
    class getName_메서드는 {

        @ParameterizedTest
        @EnumSource(Role.class)
        void 권한_이름을_리턴한다(Role role) {
            String roleName = role.getName();

            assertThat(roleName).isEqualTo("ROLE_" + role);
        }
    }

    @Nested
    class isAdmin_메서드는 {

        @Nested
        class 어드민_권한일경우 {

            @Test
            void true를_리턴한다() {
                Role role = Role.ADMIN;
                assertThat(role.isAdmin()).isTrue();
            }

        }

        @Nested
        class 어드민이_아닐경우 {

            @ParameterizedTest
            @EnumSource(
                    value = Role.class,
                    mode = EnumSource.Mode.EXCLUDE,
                    names = {"ADMIN"}
            )
            void false를_리턴한다(Role role) {
                assertThat(role.isAdmin()).isFalse();
            }

        }
    }
}
