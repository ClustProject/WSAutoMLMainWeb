package kr.co.automl.domain.metadata.domain.catalog.service;

import com.querydsl.core.Tuple;
import kr.co.automl.domain.metadata.domain.catalog.CatalogQueryRepository;
import kr.co.automl.domain.metadata.domain.catalog.Category;
import kr.co.automl.domain.metadata.domain.catalog.dto.CategoryCountResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import static kr.co.automl.domain.metadata.domain.catalog.QCatalog.catalog;

@Service
public class CatalogQuery {
    private static final Map<String, Integer> categoryCountMap = new HashMap<>();
    private static final int DEFAULT_COUNT = 0;

    private final CatalogQueryRepository catalogQueryRepository;

    public CatalogQuery(CatalogQueryRepository catalogQueryRepository) {
        this.catalogQueryRepository = catalogQueryRepository;
    }

    @Transactional(readOnly = true)
    public CategoryCountResponse getCategoryCount() {
        List<Tuple> tuples = catalogQueryRepository.countGroupByCategory();
        for (Category category : Category.values()) {
            Integer count = getCount(tuples, category);

            categoryCountMap.put(category.name(), count);
        }

        return CategoryCountResponse.from(categoryCountMap);
    }

    private Integer getCount(List<Tuple> tuples, Category category) {
        return tuples.stream()
                .filter(tuple -> matchCategory(category, tuple))
                .findFirst()
                .map(it -> it.get(catalog.count()))
                .map(Long::intValue)
                .orElse(DEFAULT_COUNT);
    }

    private boolean matchCategory(Category category, Tuple tuple) {
        Category tupleCategory = tuple.get(catalog.category);

        return Objects.equals(category, tupleCategory);
    }

}
