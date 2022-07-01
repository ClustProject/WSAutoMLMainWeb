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

import static kr.co.automl.domain.metadata.domain.catalog.dto.CreateCatalogAttributesTest.CREATE_CATALOG_ATTRIBUTES1;
import static kr.co.automl.domain.metadata.domain.dataset.dto.CreateDataSetAttributesTest.CREATE_DATASET_ATTRIBUTES1;
import static kr.co.automl.domain.metadata.domain.distribution.dto.CreateDistributionAttributesTest.CREATE_DISTRIBUTION_ATTRIBUTES1;
import static kr.co.automl.domain.user.utils.ObjectToStringConverter.convert;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
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

        CreateMetaDataAttributes attributes = CreateMetaDataAttributes.builder()
                .createCatalogAttributes(CREATE_CATALOG_ATTRIBUTES1)
                .createDataSetAttributes(CREATE_DATASET_ATTRIBUTES1)
                .createDistributionAttributes(CREATE_DISTRIBUTION_ATTRIBUTES1)
                .build();

        @Nested
        @WithMockUser
        class 해당_권한이_아닌_유저의_요청일경우 {

            @Test
            void status_403을_리턴한다() throws Exception {
                ResultActions action = mockMvc.perform(
                        post("/metadata")
                                .accept(MediaType.APPLICATION_JSON)
                                .content(convert(attributes))
                );

                action
                        .andExpect(status().isForbidden())
                        .andDo(
                                document("post-metadata-with-no-permission",
                                        preprocessRequest(prettyPrint()),
                                        preprocessResponse(prettyPrint()))
                        );
            }
        }

        @Nested
        @WithMockUser(roles = {"MANAGER", "ADMIN"})
        class 올바르지않은_형식의_요청이_주어질경우 {

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
                                        .createCatalogAttributes(CREATE_CATALOG_ATTRIBUTES1)
                                        .createDataSetAttributes(emptyCreateDataSetAttributes)
                                        .createDistributionAttributes(emptyCreateDistributionAttributes)
                                        .build()
                        ),
                        Arguments.of(
                                CreateMetaDataAttributes.builder()
                                        .createCatalogAttributes(CREATE_CATALOG_ATTRIBUTES1)
                                        .createDataSetAttributes(emptyCreateDataSetAttributes)
                                        .createDistributionAttributes(CREATE_DISTRIBUTION_ATTRIBUTES1)
                                        .build()
                        ),
                        Arguments.of(
                                CreateMetaDataAttributes.builder()
                                        .createCatalogAttributes(emptyCreateCatalogAttributes)
                                        .createDataSetAttributes(CREATE_DATASET_ATTRIBUTES1)
                                        .createDistributionAttributes(CREATE_DISTRIBUTION_ATTRIBUTES1)
                                        .build()
                        )
                );
            }

            @ParameterizedTest
            @MethodSource("invalidAttributesGenerator")
            void status_400을_리턴한다(CreateMetaDataAttributes invalidAttributes) throws Exception {
                ResultActions action = mockMvc.perform(
                        post("/metadata")
                                .accept(MediaType.APPLICATION_JSON)
                                .content(convert(invalidAttributes))
                );

                action
                        .andExpect(status().isBadRequest())
                        .andDo(document("post-metadata-invalid-attributes",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()))
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
                        .andExpect(status().isCreated())
                        .andDo(document("post-metadata",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint())
                        ));
            }

        }


    }

}
