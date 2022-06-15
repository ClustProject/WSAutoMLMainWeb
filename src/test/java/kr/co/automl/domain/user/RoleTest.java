package kr.co.automl.domain.user;

import org.junit.jupiter.api.Nested;
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
}
