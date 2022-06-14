package kr.co.automl.domain.user;

import kr.co.automl.domain.user.dto.SessionUser;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class UserTest {

    @Test
    void toSessionUser() {
        User user = User.ofDefaultRole("name", "imageUrl", "jypark1@wise.co.kr");

        SessionUser sessionUser = user.toSessionUser();

        assertThat(sessionUser).isEqualTo(
                new SessionUser("name", "imageUrl", "jypark1@wise.co.kr")
        );
    }
}
