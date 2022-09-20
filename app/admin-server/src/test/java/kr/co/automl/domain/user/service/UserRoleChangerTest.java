package kr.co.automl.domain.user.service;

import kr.co.automl.domain.user.Role;
import kr.co.automl.domain.user.TestUserFactory;
import kr.co.automl.domain.user.User;
import kr.co.automl.domain.user.UserRepository;
import kr.co.automl.domain.user.exceptions.CannotFindUserException;
import kr.co.automl.infra.InMemoryUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;

class UserRoleChangerTest {

    private UserRepository userRepository;
    private UserRoleChanger userRoleChanger;

    @BeforeEach
    void setUp() {
        this.userRepository = new InMemoryUserRepository();
        this.userRoleChanger = new UserRoleChanger(userRepository);
    }

    @Nested
    class change_메서드는 {

        @Nested
        class 존재하는_유저이름이_주어질경우 {
            private long existUserId;

            @BeforeEach
            void setUp() {
                User user = TestUserFactory.createWithId(1L);
                userRepository.save(user);

                this.existUserId = user.getId();
            }

            @Test
            void 예외가_발생하지_않는다() {
                assertThatCode(() -> userRoleChanger.change(existUserId, Role.MANAGER))
                        .doesNotThrowAnyException();
            }
        }

        @Nested
        class 존재하지않는_유저아이디가_주어질경우 {

            @BeforeEach
            void setUp() {
                userRepository.deleteAll();
            }

            @Test
            void CannotFindUserException을_던진다() {
                assertThatThrownBy(() -> userRoleChanger.change(1L, Role.MANAGER))
                        .isInstanceOf(CannotFindUserException.class)
                        .hasMessage("유저를 찾을 수 없습니다: 1");
            }
        }
    }
}
