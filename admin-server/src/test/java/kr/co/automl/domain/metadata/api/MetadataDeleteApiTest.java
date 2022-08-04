package kr.co.automl.domain.metadata.api;

import kr.co.automl.domain.metadata.domain.catalog.Catalog;
import kr.co.automl.domain.metadata.domain.catalog.CatalogTest;
import kr.co.automl.domain.metadata.domain.dataset.DataSet;
import kr.co.automl.domain.metadata.domain.dataset.DataSetRepository;
import kr.co.automl.domain.metadata.domain.dataset.DataSetTest;
import kr.co.automl.domain.metadata.domain.distribution.Distribution;
import kr.co.automl.domain.metadata.domain.distribution.DistributionTest;
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
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
@AutoConfigureRestDocs
public class MetadataDeleteApiTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private DataSetRepository dataSetRepository;

    @BeforeEach
    void setUp() {
        Catalog catalog = CatalogTest.createDefaultFixture();
        Distribution distribution = DistributionTest.createDefaultFixture();

        DataSet dataSet = DataSetTest.createDefaultFixtureWith(catalog, distribution);

        dataSetRepository.save(dataSet);
    }

    @Nested
    @DisplayName("DELETE /metadata/{id} 요청은")
    class delete_metadata_id_요청은 {

        @Nested
        @WithMockUser
        class 허용되지_않은_권한을가진_유저의_요청일경우 {

            @Test
            void status_403을_리턴한다() throws Exception {
                mockMvc.perform(delete("/metadata/1"))
                        .andExpect(status().isForbidden())
                        .andDo(document("delete-metadata-with-no-permission-user",
                                preprocessRequest(prettyPrint())
                        ));
            }
        }

        @Nested
        class 존재하지_않는_아이디가_주어질경우 {

            @BeforeEach
            void setUp() {
                dataSetRepository.deleteAll();
            }

            @Test
            void status_400을_던진다() throws Exception {
                mockMvc.perform(delete("/metadata/1"))
                        .andExpect(status().isBadRequest())
                        .andDo(document("delete-metadata-with-not-exist-id",
                                preprocessRequest(prettyPrint())
                        ));
            }
        }

        @Nested
        @WithMockUser(roles = {"MANAGER", "ADMIN"})
        class 허용된_권한을_가진_유저의_요청일경우 {

            @Test
            void status_204을_리턴한다() throws Exception {
                mockMvc.perform(delete("/metadata/1"))
                        .andExpect(status().isNoContent())
                        .andDo(document("delete-metadata",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint())
                        ));
            }
        }
    }
}
