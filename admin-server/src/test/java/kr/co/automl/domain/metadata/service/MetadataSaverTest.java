package kr.co.automl.domain.metadata.service;

import kr.co.automl.domain.metadata.domain.dataset.DataSetQueryRepository;
import kr.co.automl.domain.metadata.dto.CreateMetaDataAttributes;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import static kr.co.automl.domain.metadata.domain.catalog.dto.CreateCatalogAttributesTest.CREATE_CATALOG_ATTRIBUTES1;
import static kr.co.automl.domain.metadata.domain.dataset.dto.CreateDataSetAttributesTest.CREATE_DATASET_ATTRIBUTES1;
import static kr.co.automl.domain.metadata.domain.distribution.dto.CreateDistributionAttributesTest.CREATE_DISTRIBUTION_ATTRIBUTES1;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class MetadataSaverTest {

    @Autowired
    private MetadataSaver metadataSaver;

    @Autowired
    private DataSetQueryRepository dataSetRepository;

    @Nested
    class save_메서드는 {

        @Test
        void 메타데이터를_저장한다() {
            CreateMetaDataAttributes attributes = CreateMetaDataAttributes.builder()
                    .createCatalogAttributes(CREATE_CATALOG_ATTRIBUTES1)
                    .createDataSetAttributes(CREATE_DATASET_ATTRIBUTES1)
                    .createDistributionAttributes(CREATE_DISTRIBUTION_ATTRIBUTES1)
                    .build();
            Pageable pageable = PageRequest.of(0, 10);

            assertThat(dataSetRepository.findAllDataSets(pageable)).hasSize(0);

            metadataSaver.save(attributes);

            assertThat(dataSetRepository.findAllDataSets(pageable)).hasSize(1);
        }
    }
}
