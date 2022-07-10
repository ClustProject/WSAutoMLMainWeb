package kr.co.automl.domain.metadata.service;

import kr.co.automl.domain.metadata.domain.catalog.Catalog;
import kr.co.automl.domain.metadata.domain.catalog.CatalogTest;
import kr.co.automl.domain.metadata.domain.dataset.DataSet;
import kr.co.automl.domain.metadata.domain.dataset.DataSetRepository;
import kr.co.automl.domain.metadata.domain.dataset.DataSetTest;
import kr.co.automl.domain.metadata.domain.distribution.Distribution;
import kr.co.automl.domain.metadata.domain.distribution.DistributionTest;
import kr.co.automl.domain.metadata.dto.MetadataResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.IntStream;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class MetadataReaderTest {

    private Catalog catalog;
    private Distribution distribution;
    private DataSet dataSet;

    @Autowired
    private DataSetRepository dataSetRepository;
    @Autowired
    private MetadataReader metadataReader;

    @Nested
    class readAll_메서드는 {

        @BeforeEach
        void setUp() {
            saveDataSets(12);
        }

        @Test
        void 응답객체_리스트를_리턴한다() {
            List<MetadataResponse> metadataResponses = metadataReader.readAll(Pageable.ofSize(12));

            assertThat(metadataResponses).hasSize(12);
            assertThat(metadataResponses).contains(
                    MetadataResponse.builder()
                            .catalog(catalog.toResponse())
                            .dataSet(dataSet.toResponse())
                            .distribution(distribution.toResponse())
                            .build()
            );
        }

        @Test
        void 페이징_개수_테스트() {
            PageRequest pageRequest = PageRequest.of(1, 10);

            List<MetadataResponse> metadataResponses = metadataReader.readAll(pageRequest);

            assertThat(metadataResponses).hasSize(2);
        }

        /**
         * 데이터셋을 count개 만큼 저장합니다.
         * @param count 저장할 데이터셋 개수
         */
        private void saveDataSets(int count) {
            IntStream.rangeClosed(1, count)
                    .forEach(i -> {
                        catalog = CatalogTest.createDefaultFixture();
                        distribution = DistributionTest.createDefaultFixture();

                        dataSet = DataSetTest.createDefaultFixtureWith(catalog, distribution);

                        dataSetRepository.save(dataSet);
                    });
        }
    }
}
