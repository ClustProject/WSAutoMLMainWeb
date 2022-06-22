package kr.co.automl.domain.user.controller;

import kr.co.automl.domain.user.dto.SessionUser;
import kr.co.automl.domain.user.dto.UserInfo;
import kr.co.automl.global.config.web.LoginUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("user")
public class UserController {

    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    @GetMapping("info")
    public UserInfo getUserInfo(@LoginUser SessionUser loginUser) {
        return loginUser.toUserInfo();
    }

}
