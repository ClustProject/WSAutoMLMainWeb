package kr.co.automl.domain.user.api;

import kr.co.automl.domain.user.dto.UserResponse;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("user")
@PreAuthorize("hasRole('ADMIN')")
public class UserApi {

    @GetMapping
    public List<UserResponse> users() {
        // TODO: 2022/06/27 구현 필요!
        return null;
    }
}
