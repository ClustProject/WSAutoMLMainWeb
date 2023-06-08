package kr.co.automl.domain.metadata.api;

import kr.co.automl.domain.metadata.dataset.TestDataSetFactory;
import kr.co.automl.domain.metadata.domain.dataset.DataSet;
import kr.co.automl.domain.metadata.domain.dataset.DataSetRepository;
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
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@Transactional
public class MetadataDeleteApiTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private DataSetRepository dataSetRepository;

    @Nested
    @DisplayName("DELETE /metadata/{id} 요청은")
    class delete_metadata_id_요청은 {
        final MockHttpServletRequestBuilder request = delete("/metadata/1");

        @Nested
        @WithMockUser
        class 허용되지_않은_권한을가진_유저의_요청일경우 {

            @Test
            void status_403을_리턴한다() throws Exception {
                mockMvc.perform(request)
                        .andExpect(status().isForbidden())
                        .andDo(document("delete-metadata-with-no-permission-user",
                                preprocessRequest(prettyPrint())));
            }
        }

        @Nested
        @WithMockUser(roles = { "MANAGER", "ADMIN" })
        class 존재하지_않는_아이디가_주어질경우 {

            @BeforeEach
            void setUp() {
                dataSetRepository.deleteAll();
            }

            @Test
            void status_404을_던진다() throws Exception {
                mockMvc.perform(request)
                        .andExpect(status().isNotFound())
                        .andDo(document("delete-metadata-with-not-exist-id",
                                preprocessRequest(prettyPrint())));
            }
        }

        @Nested
        @WithMockUser(roles = { "MANAGER", "ADMIN" })
        class 허용된_권한을_가진_유저의_요청일경우 {

            @BeforeEach
            void setUp() {
                DataSet dataSet = TestDataSetFactory.createDefaultFixtureWithId(1L);

                dataSetRepository.save(dataSet);
            }

            @Test
            void status_204을_리턴한다() throws Exception {
                mockMvc.perform(request)
                        .andExpect(status().isNoContent())
                        .andDo(document("delete-metadata",
                                preprocessRequest(prettyPrint())));
            }
        }
    }
}
