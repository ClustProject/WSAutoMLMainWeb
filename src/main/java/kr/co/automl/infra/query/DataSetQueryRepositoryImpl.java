package kr.co.automl.infra.query;

import com.querydsl.jpa.impl.JPAQueryFactory;
import kr.co.automl.domain.metadata.domain.dataset.DataSet;
import kr.co.automl.domain.metadata.domain.dataset.DataSetQueryRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

import static kr.co.automl.domain.metadata.domain.catalog.QCatalog.catalog;
import static kr.co.automl.domain.metadata.domain.dataset.QDataSet.dataSet;
import static kr.co.automl.domain.metadata.domain.distribution.QDistribution.distribution;

@Repository
public class DataSetQueryRepositoryImpl implements DataSetQueryRepository {

    private final JPAQueryFactory queryFactory;

    public DataSetQueryRepositoryImpl(EntityManager entityManager) {
        this.queryFactory = new JPAQueryFactory(entityManager);
    }

    @Override
    public List<DataSet> findAllDataSets(Pageable pageable) {
        return queryFactory
                .selectFrom(dataSet)
                .join(dataSet.catalog, catalog).fetchJoin()
                .join(dataSet.distribution, distribution).fetchJoin()
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
    }
}
