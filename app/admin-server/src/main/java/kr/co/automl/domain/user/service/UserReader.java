package kr.co.automl.domain.user.service;

import kr.co.automl.domain.user.User;
import kr.co.automl.domain.user.UserRepository;
import kr.co.automl.domain.user.dto.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserReader {
    private final UserRepository userRepository;

    /**
     * 유저 응답 객체 목록을 리턴합니다.
     */
    public List<UserResponse> readUsers(Pageable pageable) {

        List<User> users = userRepository.findAll(pageable)
                .getContent();

        return users.stream()
                .map(UserResponse::from)
                .toList();
    }
}
