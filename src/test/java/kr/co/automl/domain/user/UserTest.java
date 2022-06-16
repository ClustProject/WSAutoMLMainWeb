package kr.co.automl.domain.user;

import kr.co.automl.domain.user.dto.SessionUser;
import kr.co.automl.global.config.dto.OAuthAttributes;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class UserTest {
    public static User createWithEmail(String email) {
        return User.builder()
                .email(email)
                .build();
    }

    @Nested
    class of_메서드는 {

        @Nested
        class OAuthAttributes가_주어지면 {

            @Test
            void 기본권한이_설정되어_변환된_유저를_리턴한다() {
                OAuthAttributes oAuthAttributes = new OAuthAttributes("name", "imageUrl", "email");

                User user = User.of(oAuthAttributes);

                assertThat(user).isEqualTo(User.builder()
                        .name("name")
                        .imageUrl("imageUrl")
                        .email("email")
                        .role(Role.USER)
                        .build()
                );
            }
        }
    }

    @Nested
    class ofDefaultRole_메서드는 {

        @Test
        void 기본권한이_설정되어_변환된_유저를_리턴한다() {
            User user = User.ofDefaultRole("name", "imageUrl", "email");

            assertThat(user).isEqualTo(User.builder()
                    .name("name")
                    .imageUrl("imageUrl")
                    .email("email")
                    .role(Role.USER)
                    .build()
            );
        }
    }

    @Test
    void toSessionUser() {
        User user = User.ofDefaultRole("name", "imageUrl", "jypark1@wise.co.kr");

        SessionUser sessionUser = user.toSessionUser();

        assertThat(sessionUser).isEqualTo(
                new SessionUser("name", "imageUrl", "jypark1@wise.co.kr")
        );
    }

    @Nested
    class matchEmail_메서드는 {

        @Nested
        class 일치하는_이메일의_유저가_주어진경우 {

            @Test
            void true를_리턴한다() {
                User user = createWithEmail("jypark1@wise.co.kr");
                User matchEmailUser = createWithEmail("jypark1@wise.co.kr");

                boolean actual = user.matchEmail(matchEmailUser);

                assertThat(actual).isTrue();
            }

        }

        @Nested
        class 일치하지않는_이메일의_유저가_주어진경우 {

            @Test
            void false를_리턴한다() {
                User user = createWithEmail("jypark1@wise.co.kr");
                User notMatchEmailUser = createWithEmail("xxx");

                boolean actual = user.matchEmail(notMatchEmailUser);

                assertThat(actual).isFalse();
            }

        }

        @Nested
        class 일치하는_이메일이_주어진경우 {

            @Test
            void true를_리턴한다() {
                User user = createWithEmail("jypark1@wise.co.kr");

                boolean actual = user.matchEmail("jypark1@wise.co.kr");

                assertThat(actual).isTrue();
            }
        }

        @Nested
        class 일치하지않는_이메일이_주어진경우 {

            @Test
            void false를_리턴한다() {
                User user = createWithEmail("jypark1@wise.co.kr");

                boolean actual = user.matchEmail("xxx");

                assertThat(actual).isFalse();
            }
        }
    }
}
