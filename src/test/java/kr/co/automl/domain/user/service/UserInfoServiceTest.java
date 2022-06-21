package kr.co.automl.domain.user.service;

import kr.co.automl.domain.user.Role;
import kr.co.automl.domain.user.dto.SessionUser;
import kr.co.automl.domain.user.dto.UserInfo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.servlet.http.HttpSession;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class UserInfoServiceTest {

    @Mock
    private HttpSession mockHttpSession;

    private UserInfoService userInfoService;

    @BeforeEach
    void setUp() {
        this.userInfoService = new UserInfoService(mockHttpSession);
    }

    @Nested
    class getUserInfo_메서드는 {

        @Test
        void 유저정보를_리턴한다() {
            given(mockHttpSession.getAttribute("user"))
                    .willReturn(
                            new SessionUser("name", "imageUrl", "email", Role.USER)
                    );

            UserInfo userInfo = userInfoService.getUserInfo();

            assertThat(userInfo).isEqualTo(
                    new UserInfo("name", "imageUrl", Role.USER)
            );
        }
    }
}
