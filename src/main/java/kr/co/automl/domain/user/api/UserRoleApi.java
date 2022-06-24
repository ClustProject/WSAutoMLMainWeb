package kr.co.automl.domain.user.api;

import kr.co.automl.domain.user.dto.ChangeUserRoleRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user/role")
@PreAuthorize("hasRole('ADMIN')")
public class UserRoleApi {

    @PostMapping
    public void changeRole(
            // TODO: 2022/06/25 Validation 추가
            @RequestBody ChangeUserRoleRequest changeUserRoleRequest
    ) {
        // TODO: 2022/06/25 서비스 만들고 연결
    }
}
