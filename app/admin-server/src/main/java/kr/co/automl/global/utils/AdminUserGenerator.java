package kr.co.automl.global.utils;

import kr.co.automl.domain.user.Role;
import kr.co.automl.domain.user.User;
import kr.co.automl.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Set;

/**
 * 어드민 유저 생성 담당.
 */
@Component
@RequiredArgsConstructor
public class AdminUserGenerator implements CommandLineRunner {
    public static final Set<String> ADMIN_EMAILS = Set.of(
            "tdchoi@wise.co.kr"
    );

    private final UserRepository userRepository;

    /**
     * 어플리케이션 시작 시 실행되는 메서드
     */
    @Override
    public void run(String... args) {
        ADMIN_EMAILS.stream()
                .filter(this::notExistUserFindBy)
                .map(this::createAdminUserWith)
                .forEach(userRepository::save);
    }

    private boolean notExistUserFindBy(String email) {
        return userRepository.findByEmail(email)
                .isEmpty();
    }

    private User createAdminUserWith(String email) {
        return User.builder()
                .email(email)
                .role(Role.ADMIN)
                .build();
    }
}
