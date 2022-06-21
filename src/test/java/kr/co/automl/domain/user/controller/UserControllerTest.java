package kr.co.automl.domain.user.controller;

import kr.co.automl.domain.user.Role;
import kr.co.automl.domain.user.dto.UserInfo;
import kr.co.automl.domain.user.service.UserInfoService;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import static kr.co.automl.domain.user.utils.ObjectToStringConverter.convert;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserInfoService userInfoService;

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
            void status_200을_리턴한다() throws Exception {
                UserInfo userInfo = new UserInfo("name", "imageUrl", Role.MANAGER);
                given(userInfoService.getUserInfo())
                        .willReturn(userInfo);

                ResultActions action = mockMvc.perform(request);

                action
                        .andExpect(status().isOk())
                        .andExpect(content().string(convert(userInfo)));
            }
        }
    }
}
