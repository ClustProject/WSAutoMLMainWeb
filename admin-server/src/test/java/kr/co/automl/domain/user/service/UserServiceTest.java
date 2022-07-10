package kr.co.automl.domain.user.service;

import kr.co.automl.domain.user.UserRepository;
import kr.co.automl.domain.user.UserTest;
import kr.co.automl.domain.user.dto.UserResponse;
import kr.co.automl.infra.InMemoryUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.PageRequest;

import java.util.List;
import java.util.stream.IntStream;

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

        @BeforeEach
        void setUp_유저_11명_저장() {
            IntStream.range(0, 11)
                    .mapToObj(UserTest::createWithId)
                    .forEach(user -> userRepository.save(user));
        }

        @Test
        void 페이지네이션_테스트_11개를넣어도_10개가_나온다() {
            List<UserResponse> users = userService.getUsers(PageRequest.of(0, 10));
            assertThat(users).hasSize(10);

            users = userService.getUsers(PageRequest.of(1, 10));
            assertThat(users).hasSize(1);
        }
    }
}
