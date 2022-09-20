package kr.co.automl.infra;

import kr.co.automl.domain.user.TestUserFactory;
import kr.co.automl.domain.user.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

class InMemoryUserRepositoryTest {
    private InMemoryUserRepository inMemoryUserRepository;

    @BeforeEach
    void setUp() {
        this.inMemoryUserRepository = new InMemoryUserRepository();
    }

    @Nested
    class findByEmail_메서드는 {

        @Nested
        class 존재하는_이메일인_경우 {

            @Test
            void 찾은_유저_Optional을_리턴한다() {
                User user = TestUserFactory.createWithEmail("jypark1@wise.co.kr");
                inMemoryUserRepository.save(user);

                Optional<User> actual = inMemoryUserRepository.findByEmail("jypark1@wise.co.kr");

                assertThat(actual).isEqualTo(Optional.of(user));
            }
        }

        @Nested
        class 존재하지않는_이메일인_경우 {

            @Test
            void 빈_Optional을_리턴한다() {
                User user = TestUserFactory.createWithEmail("jypark1@wise.co.kr");
                inMemoryUserRepository.save(user);

                Optional<User> actual = inMemoryUserRepository.findByEmail("xxx");

                assertThat(actual).isEqualTo(Optional.empty());
            }
        }

    }

}
