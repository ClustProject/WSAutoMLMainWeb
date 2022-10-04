package kr.co.automl.domain.metadata.domain.catalog.api;

import kr.co.automl.domain.metadata.catalog.TestCatalogFactory;
import kr.co.automl.domain.metadata.domain.catalog.CatalogRepository;
import kr.co.automl.domain.metadata.domain.catalog.Category;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@Transactional
class CategoryCountApiTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CatalogRepository catalogRepository;

    @BeforeEach
    void setUp() {
        Arrays.stream(Category.values())
                .map(TestCatalogFactory::createWithCategory)
                .forEach(catalog -> catalogRepository.save(catalog));
    }

    @Nested
    @DisplayName("GET /category/count 요청은")
    class getCategoryCount요청은 {

        @Test
        void 카테고리별_카운트를_리턴한다() throws Exception {
            ResultActions action = mockMvc.perform(
                    get("/category/count")
            );

            action
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.atmosphericEnvironment").value(1))
                    .andExpect(jsonPath("$.farm").value(1))
                    .andExpect(jsonPath("$.factory").value(1))
                    .andExpect(jsonPath("$.vital").value(1))
                    .andExpect(jsonPath("$.lifeAndVideo").value(1))
                    .andExpect(jsonPath("$.energy").value(1))
                    .andExpect(jsonPath("$.environment").value(1))
                    .andExpect(jsonPath("$.city").value(1))
                    .andExpect(jsonPath("$.openData").value(1))
                    .andDo(document("get-category-count",
                            preprocessResponse(prettyPrint())
                    ));
        }
    }
}
