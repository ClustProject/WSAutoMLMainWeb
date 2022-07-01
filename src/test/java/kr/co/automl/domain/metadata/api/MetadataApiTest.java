package kr.co.automl.domain.metadata.api;

import kr.co.automl.domain.metadata.domain.catalog.dto.CreateCatalogAttributes;
import kr.co.automl.domain.metadata.domain.dataset.dto.CreateDataSetAttributes;
import kr.co.automl.domain.metadata.domain.distribution.dto.CreateDistributionAttributes;
import kr.co.automl.domain.metadata.dto.CreateMetaDataAttributes;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Stream;

import static kr.co.automl.domain.user.utils.ObjectToStringConverter.convert;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@Transactional
class MetadataApiTest {

    @Autowired
    private MockMvc mockMvc;

    @Nested
    @DisplayName("POST /metadata 요청은")
    class post_metadata_요청은 {
        static CreateCatalogAttributes createCatalogAttributes = CreateCatalogAttributes.builder()
                .category("대기 환경")
                .theme("공기질")
                .themeTaxonomy("주제 분류")
                .build();

        static CreateDataSetAttributes createDataSetAttributes = CreateDataSetAttributes.builder()
                .title("제목")
                .publisher("한국도로공사")
                .creator("위세아이텍")
                .contactPointName("박주영")
                .type("이미지")
                .keyword("키워드1, 키워드2")
                .license("PUBLIC")
                .rights("All")
                .description("설명...")
                .build();

        static CreateDistributionAttributes createDistributionAttributes = CreateDistributionAttributes.builder()
                .title("a.csv")
                .description("설명...")
                .downloadUrl("https://download-url.com")
                .temporalResolution("측정 단위")
                .accurualPeriodicityName("일")
                .spatial("공간 정보")
                .temporal("시간 정보")
                .build();

        CreateMetaDataAttributes attributes = CreateMetaDataAttributes.builder()
                .createCatalogAttributes(createCatalogAttributes)
                .createDataSetAttributes(createDataSetAttributes)
                .createDistributionAttributes(createDistributionAttributes)
                .build();

        @Nested
        @WithMockUser
        class 매니저_혹은_어드민이_아닌_유저의_요청일경우 {

            @Test
            void status_403을_리턴한다() throws Exception {
                ResultActions action = mockMvc.perform(
                        post("/metadata")
                                .accept(MediaType.APPLICATION_JSON)
                                .content(convert(attributes))
                );

                action
                        .andExpect(status().isForbidden());
            }
        }

        @Nested
        @WithMockUser(roles = {"MANAGER", "ADMIN"})
        class 올바르지않은_형식의_요청이_주어질경우 {

            @ParameterizedTest
            @MethodSource("invalidAttributesGenerator")
            void status_400을_리턴한다(CreateMetaDataAttributes invalidAttributes) throws Exception {
                ResultActions action = mockMvc.perform(
                        post("/metadata")
                                .accept(MediaType.APPLICATION_JSON)
                                .content(convert(invalidAttributes))
                );

                action
                        .andExpect(status().isBadRequest());
            }

            private static Stream<Arguments> invalidAttributesGenerator() {
                CreateCatalogAttributes emptyCreateCatalogAttributes = CreateCatalogAttributes.builder()
                        .build();
                CreateDataSetAttributes emptyCreateDataSetAttributes = CreateDataSetAttributes.builder()
                        .build();
                CreateDistributionAttributes emptyCreateDistributionAttributes = CreateDistributionAttributes.builder()
                        .build();

                return Stream.of(
                        Arguments.of(
                                CreateMetaDataAttributes.builder()
                                        .createCatalogAttributes(emptyCreateCatalogAttributes)
                                        .createDataSetAttributes(emptyCreateDataSetAttributes)
                                        .createDistributionAttributes(emptyCreateDistributionAttributes)
                                        .build()
                        ),
                        Arguments.of(
                                CreateMetaDataAttributes.builder()
                                        .createCatalogAttributes(createCatalogAttributes)
                                        .createDataSetAttributes(emptyCreateDataSetAttributes)
                                        .createDistributionAttributes(emptyCreateDistributionAttributes)
                                        .build()
                        ),
                        Arguments.of(
                                CreateMetaDataAttributes.builder()
                                        .createCatalogAttributes(createCatalogAttributes)
                                        .createDataSetAttributes(emptyCreateDataSetAttributes)
                                        .createDistributionAttributes(createDistributionAttributes)
                                        .build()
                        ),
                        Arguments.of(
                                CreateMetaDataAttributes.builder()
                                        .createCatalogAttributes(emptyCreateCatalogAttributes)
                                        .createDataSetAttributes(createDataSetAttributes)
                                        .createDistributionAttributes(createDistributionAttributes)
                                        .build()
                        )
                );
            }
        }

        @Nested
        @WithMockUser(roles = {"MANAGER", "ADMIN"})
        class 매니저_혹은_어드민_권한_유저의_요청일경우 {

            @Test
            void status_201을_리턴한다() throws Exception {
                ResultActions action = mockMvc.perform(
                        post("/metadata")
                                .accept(MediaType.APPLICATION_JSON)
                                .content(convert(attributes))
                );

                action
                        .andExpect(status().isCreated());
            }

        }


    }

}
