package kr.co.automl.infra.query;

import static kr.co.automl.domain.metadata.domain.catalog.QCatalog.catalog;
import static kr.co.automl.domain.metadata.domain.dataset.QDataSet.dataSet;
import static kr.co.automl.domain.metadata.domain.distribution.QDistribution.distribution;

import java.util.List;
import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;

import kr.co.automl.domain.metadata.domain.dataset.DataSet;
import kr.co.automl.domain.metadata.domain.dataset.DataSetQueryRepository;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class DataSetQueryRepositoryImpl implements DataSetQueryRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<DataSet> findAll() {
        return queryFactory
                .selectFrom(dataSet)
                .join(dataSet.catalog, catalog).fetchJoin()
                .join(dataSet.distribution, distribution).fetchJoin()
                .fetch();
    }

}
