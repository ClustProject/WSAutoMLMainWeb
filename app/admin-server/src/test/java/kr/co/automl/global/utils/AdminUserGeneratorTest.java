package kr.co.automl.global.utils;

import kr.co.automl.domain.user.User;
import kr.co.automl.domain.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static kr.co.automl.global.utils.AdminUserGenerator.ADMIN_EMAILS;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class AdminUserGeneratorTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdminUserGenerator adminUserGenerator;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
    }

    @Nested
    class run_메서드는 {

        @ParameterizedTest
        @ValueSource(strings = {
                "tdchoi@wise.co.kr"
        })
        void 어드민_유저가_없다면_생성한다(String adminEmail) {
            adminUserGenerator.run();

            Optional<User> findUserByEmail = userRepository.findByEmail(adminEmail);
            assertThat(findUserByEmail).isNotEqualTo(Optional.empty());
        }

        @Test
        void 이미_존재한다면_스킵한다() {
            ADMIN_EMAILS.stream()
                    .map(this::createUserWith)
                    .forEach(userRepository::save);
            assertThat(userRepository.findAll()).hasSize(1);

            adminUserGenerator.run();

            assertThat(userRepository.findAll()).hasSize(1);
        }

        private User createUserWith(String email) {
            return User.builder()
                    .email(email)
                    .build();
        }
    }
}
