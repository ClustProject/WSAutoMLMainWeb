package kr.co.automl.domain.user.service;

import kr.co.automl.domain.user.Role;
import kr.co.automl.domain.user.User;
import kr.co.automl.domain.user.UserRepository;
import kr.co.automl.domain.user.exceptions.CannotFindUserException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 유저 권한 변경 담당.
 */
@Service
@RequiredArgsConstructor
public class UserRoleChanger {
    private final UserRepository userRepository;

    /**
     * 유저 권한을 변경합니다.
     * @param userId 변경할 유저 식별자
     * @param role 변경할 권한
     *
     * @throws CannotFindUserException 식별자로 유저를 찾지 못한 경우
     */
    @Transactional
    public void change(long userId, Role role) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CannotFindUserException(userId));

        user.changeRoleTo(role);
    }
}
