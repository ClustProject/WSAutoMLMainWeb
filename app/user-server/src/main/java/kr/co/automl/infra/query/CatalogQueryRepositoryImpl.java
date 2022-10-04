package kr.co.automl.infra.query;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import kr.co.automl.domain.metadata.domain.catalog.CatalogQueryRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import static kr.co.automl.domain.metadata.domain.catalog.QCatalog.catalog;

@Repository
public class CatalogQueryRepositoryImpl implements CatalogQueryRepository {

    private final JPAQueryFactory queryFactory;

    public CatalogQueryRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public List<Tuple> countGroupByCategory() {
        return queryFactory.select(catalog.category, catalog.count())
                .from(catalog)
                .groupBy(catalog.category)
                .fetch();
    }

}
