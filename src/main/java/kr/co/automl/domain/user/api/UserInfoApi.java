package kr.co.automl.domain.user.api;

import kr.co.automl.domain.user.dto.SessionUser;
import kr.co.automl.domain.user.dto.UserInfo;
import kr.co.automl.global.config.web.LoginUser;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user/info")
@PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
public class UserInfoApi {

    @GetMapping
    public UserInfo getUserInfo(@LoginUser SessionUser loginUser) {
        return loginUser.toUserInfo();
    }

}
