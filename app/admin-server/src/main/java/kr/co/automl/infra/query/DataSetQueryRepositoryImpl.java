package kr.co.automl.infra.query;

import static kr.co.automl.domain.metadata.domain.catalog.QCatalog.catalog;
import static kr.co.automl.domain.metadata.domain.dataset.QDataSet.dataSet;
import static kr.co.automl.domain.metadata.domain.distribution.QDistribution.distribution;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
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
    public Page<DataSet> findAll(Pageable pageable) {
        List<DataSet> results = queryFactory
                .selectFrom(dataSet)
                .join(dataSet.catalog, catalog).fetchJoin()
                .join(dataSet.distribution, distribution).fetchJoin()
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long total = queryFactory
                .selectFrom(dataSet)
                .fetch().size();

        return new PageImpl<>(results, pageable, total);
    }

}
