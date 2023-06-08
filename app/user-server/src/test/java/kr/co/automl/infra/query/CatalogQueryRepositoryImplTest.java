// package kr.co.automl.infra.query;

// import static kr.co.automl.domain.metadata.domain.catalog.QCatalog.catalog;
// import static org.assertj.core.api.Assertions.assertThat;

// import java.util.Arrays;
// import java.util.List;

// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Nested;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.security.test.context.support.WithMockUser;
// import org.springframework.transaction.annotation.Transactional;

// import com.querydsl.core.Tuple;

// import kr.co.automl.domain.metadata.catalog.TestCatalogFactory;
// import kr.co.automl.domain.metadata.domain.catalog.CatalogRepository;
// import kr.co.automl.domain.metadata.domain.catalog.Category;

// @SpringBootTest
// @Transactional
// class CatalogQueryRepositoryImplTest {

// @Autowired
// private CatalogQueryRepositoryImpl catalogQueryRepositoryImpl;

// @Autowired
// private CatalogRepository catalogRepository;

// @Nested
// class countGroupByCategory_메서드는 {

// @Nested
// class 값이_있을경우 {

// @BeforeEach
// void setUp() {
// Arrays.stream(Category.values())
// .map(TestCatalogFactory::createWithCategory)
// .forEach(catalog -> catalogRepository.save(catalog));

// }

// @Test
// @WithMockUser(username = "testUser", roles = { "USER", "ADMIN" })
// void 그룹별_카테고리_이름과_개수를_리턴한다() {
// List<Tuple> tuples = catalogQueryRepositoryImpl.countGroupByCategory();

// for (Tuple tuple : tuples) {
// Category category = tuple.get(catalog.category);
// Long count = tuple.get(catalog.count());

// assertThat(category).isInstanceOf(Category.class);
// assertThat(count).isEqualTo(1);
// }
// }
// }

// @Nested
// class 값이_없을경우 {

// @BeforeEach
// void setUp() {
// catalogRepository.deleteAll();
// }

// @Test
// @WithMockUser(username = "testUser", roles = { "USER", "ADMIN" })
// void 빈_배열을_리턴한다() {
// List<Tuple> tuples = catalogQueryRepositoryImpl.countGroupByCategory();
// assertThat(tuples).isEmpty();
// }
// }
// }
// }
