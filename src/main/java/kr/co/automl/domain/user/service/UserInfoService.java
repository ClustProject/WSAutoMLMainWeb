package kr.co.automl.domain.user.service;

import kr.co.automl.domain.user.dto.SessionUser;
import kr.co.automl.domain.user.dto.UserInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

@RequiredArgsConstructor
@Service
public class UserInfoService {
    private final HttpSession httpSession;

    public UserInfo getUserInfo() {
        SessionUser sessionUser = toSessionUser(httpSession.getAttribute("user"));

        return sessionUser.toUserInfo();
    }

    private SessionUser toSessionUser(Object user) {
        return (SessionUser) user;
    }
}
