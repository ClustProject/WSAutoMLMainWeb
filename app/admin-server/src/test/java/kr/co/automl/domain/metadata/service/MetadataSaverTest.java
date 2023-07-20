package kr.co.automl.domain.metadata.service;

import kr.co.automl.domain.metadata.catalog.dto.CreateCatalogAttributesFixtures;
import kr.co.automl.domain.metadata.dataset.dto.CreateDataSetAttributesFixtures;
import kr.co.automl.domain.metadata.distribution.dto.CreateDistributionAttributesFixtures;
import kr.co.automl.domain.metadata.domain.dataset.DataSetQueryRepository;
import kr.co.automl.domain.metadata.dto.CreateMetaDataAttributes;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

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
                    .createCatalogAttributes(CreateCatalogAttributesFixtures.fixture1())
                    .createDataSetAttributes(CreateDataSetAttributesFixtures.fixture1())
                    .createDistributionAttributes(CreateDistributionAttributesFixtures.fixture1())
                    .build();

            assertThat(dataSetRepository.findAll()).isEmpty();

            metadataSaver.save(attributes);

            assertThat(dataSetRepository.findAll()).hasSize(1);
        }
    }
}
