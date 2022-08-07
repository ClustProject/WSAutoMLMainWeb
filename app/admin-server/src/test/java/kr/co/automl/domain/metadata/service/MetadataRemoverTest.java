package kr.co.automl.domain.metadata.service;

import kr.co.automl.domain.metadata.domain.catalog.Catalog;
import kr.co.automl.domain.metadata.domain.catalog.CatalogTest;
import kr.co.automl.domain.metadata.domain.dataset.DataSet;
import kr.co.automl.domain.metadata.domain.dataset.DataSetRepository;
import kr.co.automl.domain.metadata.domain.dataset.DataSetTest;
import kr.co.automl.domain.metadata.domain.dataset.exceptions.CannotFindDataSetException;
import kr.co.automl.domain.metadata.domain.distribution.Distribution;
import kr.co.automl.domain.metadata.domain.distribution.DistributionTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;

@SpringBootTest
@Transactional
class MetadataRemoverTest {

    @Autowired
    private MetadataRemover metadataRemover;

    @Autowired
    private DataSetRepository dataSetRepository;

    @Nested
    class remove_메서드는 {

        @Nested
        class 존재하지_않는_식별자가_주어질경우 {

            @BeforeEach
            void setUp() {
                dataSetRepository.deleteAll();
            }

            @Test
            void CannotFindDataSetException을_던진다() {
                assertThatThrownBy(() -> metadataRemover.remove(1L))
                        .isInstanceOf(CannotFindDataSetException.class)
                        .hasMessage("식별자 1에 대한 데이터셋을 찾을 수 없습니다.");
            }

        }

        @Nested
        class 존재하는_식별자가_주어질경우 {

            private Long existId;

            @BeforeEach
            void setUp() {
                Catalog catalog = CatalogTest.createDefaultFixture();
                Distribution distribution = DistributionTest.createDefaultFixture();
                DataSet dataSet = DataSetTest.createDefaultFixtureWith(catalog, distribution);

                dataSetRepository.save(dataSet);

                this.existId = dataSet.getId();
            }

            @Test
            void 삭제한다() {
                assertThatCode(() -> metadataRemover.remove(existId))
                        .doesNotThrowAnyException();
            }
        }
    }
}
