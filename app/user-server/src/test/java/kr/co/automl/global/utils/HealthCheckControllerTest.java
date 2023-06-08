package kr.co.automl.global.utils;

import static org.hamcrest.Matchers.matchesPattern;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

@SpringBootTest(classes = HealthCheckController.class)
@AutoConfigureMockMvc
public class HealthCheckControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Nested
    @DisplayName("GET /health-check 요청은")
    class get_health_check_요청은 {

        @Test
        @WithMockUser(username = "testUser", roles = { "USER", "ADMIN" })
        void 현재시간과_status_200을_응답한다() throws Exception {
            ResultActions actions = mockMvc.perform(get("/health-check"));

            actions
                    .andExpect(status().isOk())
                    .andExpect(content().string(matchesPattern("[0-9]{13}")));
        }
    }
}
