package kr.co.automl.global.utils;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class FrontendUrlRequestHandlerTest {

    @Autowired
    private MockMvc mockMvc;

    @Nested
    @DisplayName("GET / 요청은")
    class get_요청은 {

        @Test
        void status_200을_응답한다() throws Exception {
            ResultActions action = mockMvc.perform(get("/"));

            action
                    .andExpect(status().isOk());
        }
    }
}
