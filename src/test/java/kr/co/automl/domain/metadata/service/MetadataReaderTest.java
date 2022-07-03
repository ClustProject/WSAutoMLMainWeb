package kr.co.automl.domain.metadata.service;

import kr.co.automl.domain.metadata.domain.catalog.Catalog;
import kr.co.automl.domain.metadata.domain.catalog.CatalogTest;
import kr.co.automl.domain.metadata.domain.dataset.DataSet;
import kr.co.automl.domain.metadata.domain.dataset.DataSetRepository;
import kr.co.automl.domain.metadata.domain.distribution.Distribution;
import kr.co.automl.domain.metadata.domain.distribution.DistributionTest;
import kr.co.automl.domain.metadata.dto.MetadataResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static kr.co.automl.domain.metadata.domain.dataset.DataSetTest.DATA_SET1;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class MetadataReaderTest {

    @Autowired
    private DataSetRepository dataSetRepository;

    @Autowired
    private MetadataReader metadataReader;

    @Nested
    class readAll_메서드는 {

        @BeforeEach
        void setUp() {
            Catalog catalog = CatalogTest.createFixture();
            Distribution distribution = DistributionTest.createFixture();

            DataSet dataSet1 = DATA_SET1;
            dataSet1.setRelation(catalog, distribution);

            dataSetRepository.save(dataSet1);

        }

        @Test
        void 응답객체_리스트를_리턴한다() {
            List<MetadataResponse> metadataResponses = metadataReader.readAll();

            assertThat(metadataResponses).hasSize(1);
            assertThat(metadataResponses).containsExactly(
                    MetadataResponse.builder()
                            .catalog(CatalogTest.createFixture().toResponse())
                            .dataSet(DATA_SET1.toResponse())
                            .distribution(DistributionTest.createFixture().toResponse())
                            .build()
            );
        }
    }
}
