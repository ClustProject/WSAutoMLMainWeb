package kr.co.automl.infra.query;

import static kr.co.automl.domain.metadata.domain.dataset.QDataSet.dataSet;
import static kr.co.automl.domain.metadata.domain.distribution.QDistribution.distribution;
import static kr.co.automl.domain.metadata.domain.result.QMlResult.mlResult;
import static kr.co.automl.domain.user.QUser.user;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;

import kr.co.automl.domain.metadata.domain.result.MlResult;
import kr.co.automl.domain.metadata.domain.result.MlResultQueryRepository;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MlResultQueryRepostiroyImpl implements MlResultQueryRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<MlResult> findAll() {
        return queryFactory
                .selectFrom(mlResult)
                .join(mlResult.user, user).fetchJoin()
                .join(mlResult.dataSet, dataSet).fetchJoin()
                .fetch();
    }

    @Override
    public List<MlResult> findAllByEmail(String email) {
        return queryFactory
                .selectFrom(mlResult)
                .join(mlResult.user, user).fetchJoin()
                .join(mlResult.dataSet, dataSet).fetchJoin()
                .join(dataSet.distribution, distribution).fetchJoin()
                .where(user.email.eq(email))
                .fetch();
    }

    @Override
    public Long countMlResult() {
        Tuple result = queryFactory.select(
                mlResult.count().as("all"),
                mlResult.state.when("학습중").then(1L).otherwise(0L).sum().as("ing"),
                mlResult.state.when("학습완료").then(1L).otherwise(0L).sum().as("end"))
                .from(mlResult)
                .fetchOne();

        return result.get(Expressions.numberPath(Long.class, "mlResultCount"));
    }

    @Override
    public void deleteById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Id must not be null");
        }

        queryFactory
                .delete(mlResult)
                .where(mlResult.id.eq(id))
                .execute();
    }

}
