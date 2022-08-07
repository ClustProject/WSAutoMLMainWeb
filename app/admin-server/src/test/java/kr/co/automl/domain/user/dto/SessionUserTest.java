package kr.co.automl.domain.user.dto;

import kr.co.automl.domain.user.Role;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class SessionUserTest {

    @Nested
    class toUserInfo_메서드는 {

        @Test
        void 변환된_유저정보를_리턴한다() {
            SessionUser sessionUser = new SessionUser("name", "imageUrl", "email", Role.USER);

            UserInfo userInfo = sessionUser.toUserInfo();

            assertThat(userInfo).isEqualTo(
                    new UserInfo("name", "imageUrl", Role.USER)
            );
        }
    }
}
