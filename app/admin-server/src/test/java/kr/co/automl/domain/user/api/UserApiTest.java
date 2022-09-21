package kr.co.automl.domain.user.api;

import kr.co.automl.domain.user.TestUserFactory;
import kr.co.automl.domain.user.User;
import kr.co.automl.domain.user.UserRepository;
import kr.co.automl.domain.user.dto.UserResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static kr.co.automl.domain.user.utils.ObjectToStringConverter.convert;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@Transactional
class UserApiTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Nested
    @DisplayName("GET /user 요청은")
    class get_user_요청은 {
        MockHttpServletRequestBuilder request = get("/user");

        @Nested
        class 어드민이_아닌_유저의_요청일경우 {

            @Test
            @WithMockUser(roles = {"USER, MANAGER"})
            void status_403을_응답한다() throws Exception {
                ResultActions action = mockMvc.perform(request);

                action
                        .andExpect(status().isForbidden())
                        .andDo(document("get-user-with-not-admin"));
            }
        }

        @Nested
        class 어드민_유저의_요청일경우 {
            private User savedUser;

            @BeforeEach
            void setUp() {
                userRepository.deleteAll();

                User user = TestUserFactory.create();
                userRepository.save(user);

                this.savedUser = user;
            }

            @Test
            @WithMockUser(roles = {"ADMIN"})
            void status_200을_응답하고_유저목록을_리턴한다() throws Exception {
                ResultActions action = mockMvc.perform(request);

                action
                        .andExpect(status().isOk())
                        .andExpect(content().string(convert(List.of(UserResponse.from(savedUser)))))
                        .andDo(document("get-user"));
            }
        }
    }
}
