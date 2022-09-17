package kr.co.automl.global.utils.web;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class FrontendUrlRequestHandlerTest {

    @Autowired
    private MockMvc mockMvc;

    @Nested
    @DisplayName("GET /dashboard")
    class get_dashboard_요청은 {
        MockHttpServletRequestBuilder request
                = get("/dashboard");

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
                ResultActions action = mockMvc.perform(request);

                action
                        .andExpect(status().isOk());
            }
        }
    }

    @Nested
    @DisplayName("GET /metadata/management 요청은")
    class get_metadata_management_요청은 {
        MockHttpServletRequestBuilder request
                = get("/metadata/management");

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
                ResultActions action = mockMvc.perform(request);

                action
                        .andExpect(status().isOk());
            }
        }
    }

    @Nested
    @DisplayName("GET /user/role-management 요청은")
    class get_user_roleManagement_요청은 {
        MockHttpServletRequestBuilder request
                = get("/user/role-management");

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
                ResultActions action = mockMvc.perform(request);

                action
                        .andExpect(status().isOk());
            }
        }
    }

    @Nested
    @DisplayName("GET /user-management/role 요청은")
    class get_user_management_role_요청은 {
        MockHttpServletRequestBuilder request
                = get("/user-management/role");

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
                ResultActions action = mockMvc.perform(request);

                action
                        .andExpect(status().isOk());
            }
        }
    }
}
