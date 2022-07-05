package kr.co.automl.api;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
class UrlApiTest {

    @Autowired
    private MockMvc mockMvc;

    @Nested
    @DisplayName("GET /url/presigned 요청은")
    class get_url_presigned_요청은 {

        @Nested
        @WithMockUser
        class 허용되지_않은_권한을가진_유저의_요청일경우 {

            @Test
            void status_403을_응답한다() throws Exception {
                mockMvc.perform(get("/url/presigned"))
                        .andExpect(status().isForbidden());
            }
        }

        @Nested
        @WithMockUser(roles = {"MANAGER", "ADMIN"})
        class 허용된_권한을가진_유저의_요청일경우 {

            @Test
            void status_200과_url을_리턴한다() throws Exception {
                String filename = "a.csv";
                String url = String.format("/url/presigned?filename=%s", filename);

                mockMvc.perform(get(url))
                        .andExpect(status().isOk())
                        .andDo(document("get-presigned-url",
                                preprocessResponse(prettyPrint())
                        ));
            }
        }
    }
}
