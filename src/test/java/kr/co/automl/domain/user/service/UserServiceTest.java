package kr.co.automl.domain.user.service;

import kr.co.automl.domain.user.User;
import kr.co.automl.domain.user.UserRepository;
import kr.co.automl.domain.user.UserTest;
import kr.co.automl.domain.user.dto.UserResponse;
import kr.co.automl.infra.InMemoryUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class UserServiceTest {

    private UserService userService;
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        this.userRepository = new InMemoryUserRepository();
        this.userService = new UserService(userRepository);
    }

    @Nested
    class getUsers {
        private User savedUser;

        @BeforeEach
        void setUp() {
            User user = UserTest.create();
            userRepository.save(user);

            this.savedUser = user;
        }

        @Test
        void 목록_리턴() {
            List<UserResponse> users = userService.getUsers();

            assertThat(users).isEqualTo(List.of(
                    savedUser.toResponse())
            );
        }
    }
}
