package kr.co.automl.domain.user.api;

import kr.co.automl.domain.user.Role;
import kr.co.automl.domain.user.dto.SessionUser;
import kr.co.automl.domain.user.dto.UserInfo;
import kr.co.automl.global.config.web.LoginUser;
import kr.co.automl.global.config.web.LoginUserArgumentResolver;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.MethodParameter;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.ModelAndViewContainer;

import javax.servlet.http.HttpSession;

import static kr.co.automl.domain.user.utils.ObjectToStringConverter.convert;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class UserInfoApiTest {

    @Autowired
    MockMvc mockMvc;

    /**
     * {@link LoginUser} 파라미터에서 들어오는 값을 mocking하기 위한 resolver
     */
    static class MockLoginUserArgumentResolver extends LoginUserArgumentResolver {

        public MockLoginUserArgumentResolver(HttpSession httpSession) {
            super(httpSession);
        }

        @Override
        public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
            return new SessionUser("name", "imageUrl", "email", Role.MANAGER);
        }
    }

    @Nested
    class get_user_info_요청은 {
        MockHttpServletRequestBuilder request
                = get("/user/info");

        @Nested
        @WithMockUser
        class 매니저나_관리자가_아닌_유저일경우 {

            @Test
            void status_403을_리턴한다() throws Exception {
                ResultActions action = mockMvc.perform(request);

                action
                        .andExpect(status().isForbidden());
            }
        }

        @Nested
        class 매니저나_관리저인_유저일경우 {

            @Test
            @WithMockUser(roles = {"MANAGER", "ADMIN"})
            void status_200을_응답하고_유저정보를_리턴한다() throws Exception {
                mockMvc = MockMvcBuilders.standaloneSetup(new UserInfoApi())
                        .setCustomArgumentResolvers(new MockLoginUserArgumentResolver(new MockHttpSession()))
                        .build();

                ResultActions action = mockMvc.perform(request);

                UserInfo userInfo = new UserInfo("name", "imageUrl", Role.MANAGER);
                action
                        .andExpect(status().isOk())
                        .andExpect(content().string(convert(userInfo)));
            }
        }
    }
}
