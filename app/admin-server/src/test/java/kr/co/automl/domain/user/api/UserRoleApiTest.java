package kr.co.automl.domain.user.api;

import kr.co.automl.domain.user.TestUserFactory;
import kr.co.automl.domain.user.User;
import kr.co.automl.domain.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import static kr.co.automl.domain.user.dto.ChangeUserRoleRequestTest.CHANGE_USER_ROLE_REQUEST1;
import static kr.co.automl.domain.user.utils.ObjectToStringConverter.convert;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@Transactional
class UserRoleApiTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Nested
    @DisplayName("PUT /user/{userId}/role 요청은")
    class put_user_role_요청은 {

        @Nested
        @WithMockUser(roles = {"USER", "MANAGER"})
        class 어드민이_아닌_유저의_요청이_주어질경우 {

            @Test
            void status_403을_리턴한다() throws Exception {
                ResultActions action = mockMvc.perform(
                        put("/user/1/role")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(convert(CHANGE_USER_ROLE_REQUEST1))
                );

                action
                        .andExpect(status().isForbidden())
                        .andDo(document("put-user-role-with-not-admin"));
            }
        }

        @Nested
        class 존재하지_않는_유저_아이디가_주어질경우 {

            @BeforeEach
            void setUp() {
                userRepository.deleteAll();
            }

            @Test
            @WithMockUser(roles = {"ADMIN"})
            void status_400을_응답한다() throws Exception {
                ResultActions action = mockMvc.perform(
                        put(String.format("/user/1/role"))
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(convert(CHANGE_USER_ROLE_REQUEST1))
                );

                action
                        .andExpect(status().isBadRequest())
                        .andDo(document("put-user-role-with-not-exist-id"));
            }
        }

        @Nested
        class 존재하는_유저_아이디가_주어질경우 {
            private User savedUser;

            @BeforeEach
            void setUp() {
                User user = TestUserFactory.create("name", "imageUrl", "email");
                this.savedUser = userRepository.save(user);
            }

            @Test
            @WithMockUser(roles = {"ADMIN"})
            void status_200을_응답한다() throws Exception {
                ResultActions action = mockMvc.perform(
                        put(String.format("/user/%s/role", savedUser.getId()))
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(convert(CHANGE_USER_ROLE_REQUEST1))
                );

                action
                        .andExpect(status().isOk())
                        .andDo(document("put-user-role-with-exist-id"));
            }
        }
    }
}
