package kr.co.automl.domain.user.api;

import kr.co.automl.domain.user.Role;
import kr.co.automl.domain.user.dto.ChangeUserRoleRequest;
import kr.co.automl.domain.user.service.UserRoleChanger;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/user/role")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class UserRoleApi {
    private final UserRoleChanger userRoleChanger;

    @PutMapping
    public void changeRole(
            @RequestBody @Valid ChangeUserRoleRequest changeUserRoleRequest
    ) {
        long userId = changeUserRoleRequest.userId();
        Role role = changeUserRoleRequest.role();

        userRoleChanger.change(userId, role);
    }

}
