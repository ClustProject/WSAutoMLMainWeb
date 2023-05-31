package kr.co.automl.domain.user.api;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.automl.domain.user.dto.SessionUser;
import kr.co.automl.domain.user.dto.UserInfo;
import kr.co.automl.global.config.web.LoginUser;

@RestController
@RequestMapping("/user")
public class UserApi {

    @GetMapping("/info")
    public UserInfo getUserInfo(@LoginUser SessionUser loginUser) {
        return loginUser.toUserInfo();
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
    }

}
