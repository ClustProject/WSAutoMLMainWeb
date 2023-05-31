package kr.co.automl.domain.user.dto;

import kr.co.automl.domain.user.Role;
import kr.co.automl.domain.user.TestUserFactory;
import kr.co.automl.domain.user.User;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class SessionUserTest {

    @Nested
    class from_메서드는 {

        @Nested
        class 유저가_주어지면 {

            @Test
            void 변환된_세션유저를_리턴한다() {
                User user = TestUserFactory.create();

                SessionUser sessionUser = SessionUser.from(user);

                assertThat(sessionUser).isEqualTo(new SessionUser(
                        "name",
                        "imageUrl",
                        "email",
                        Role.USER));
            }
        }
    }

    @Nested
    class toUserInfo_메서드는 {

        @Test
        void 변환된_유저정보를_리턴한다() {
            SessionUser sessionUser = new SessionUser("name", "imageUrl", "email", Role.USER);

            UserInfo userInfo = sessionUser.toUserInfo();

            assertThat(userInfo).isEqualTo(
                    new UserInfo("name", "imageUrl", "email", Role.USER));
        }
    }
}
