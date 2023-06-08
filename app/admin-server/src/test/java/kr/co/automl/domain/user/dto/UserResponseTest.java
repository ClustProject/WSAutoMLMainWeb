package kr.co.automl.domain.user.dto;

import kr.co.automl.domain.user.Role;
import kr.co.automl.domain.user.TestUserFactory;
import kr.co.automl.domain.user.User;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class UserResponseTest {

    @Nested
    class from_메서드는 {

        @Nested
        class 유저가_주어지면 {

            @Test
            void 변환된_응답을_리턴한다() {
                User user = TestUserFactory.create();

                UserResponse userResponse = UserResponse.from(user);

                assertThat(userResponse).isEqualTo(new UserResponse(
                        0L,
                        "name",
                        "imageUrl",
                        "email",
                        Role.USER));
            }
        }
    }
}
