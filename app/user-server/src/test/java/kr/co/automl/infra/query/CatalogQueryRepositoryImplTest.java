package kr.co.automl.infra.query;

import com.querydsl.core.Tuple;
import kr.co.automl.domain.metadata.catalog.TestCatalogFactory;
import kr.co.automl.domain.metadata.domain.catalog.CatalogRepository;
import kr.co.automl.domain.metadata.domain.catalog.Category;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

import static kr.co.automl.domain.metadata.domain.catalog.QCatalog.catalog;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class CatalogQueryRepositoryImplTest {

    @Autowired
    private CatalogQueryRepositoryImpl catalogQueryRepositoryImpl;

    @Autowired
    private CatalogRepository catalogRepository;

    @Nested
    class countGroupByCategory_메서드는 {

        @BeforeEach
        void setUp() {
            Arrays.stream(Category.values())
                    .map(TestCatalogFactory::createWithCategory)
                    .forEach(catalog -> catalogRepository.save(catalog));

        }

        @Test
        void 그룹별_카테고리_이름과_개수를_리턴한다() {
            List<Tuple> tuples = catalogQueryRepositoryImpl.countGroupByCategory();

            for (Tuple tuple : tuples) {
                Category category = tuple.get(catalog.category);
                Long count = tuple.get(catalog.count());

                assertThat(category).isInstanceOf(Category.class);
                assertThat(count).isEqualTo(1);
            }
        }
    }
}
