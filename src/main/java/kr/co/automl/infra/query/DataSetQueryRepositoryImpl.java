package kr.co.automl.infra.query;

import com.querydsl.jpa.impl.JPAQueryFactory;
import kr.co.automl.domain.metadata.domain.dataset.DataSetQueryRepository;
import kr.co.automl.domain.metadata.dto.MetadataResponse;
import kr.co.automl.domain.metadata.dto.QMetadataResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

import static kr.co.automl.domain.metadata.domain.dataset.QDataSet.dataSet;

@Repository
public class DataSetQueryRepositoryImpl implements DataSetQueryRepository {

    private final JPAQueryFactory queryFactory;

    public DataSetQueryRepositoryImpl(EntityManager entityManager) {
        this.queryFactory = new JPAQueryFactory(entityManager);
    }

    @Override
    public List<MetadataResponse> findAllDataSets(Pageable pageable) {
        return queryFactory
                .select(new QMetadataResponse(
                        dataSet.catalog.category.stringValue(),
                        dataSet.catalog.theme.stringValue(),
                        dataSet.catalog.themeTaxonomy,
                        dataSet.title,
                        dataSet.organization.publisher,
                        dataSet.organization.creator.stringValue(),
                        dataSet.organization.contactPoint.name,
                        dataSet.organization.contactPoint.email,
                        dataSet.type.stringValue(),
                        dataSet.keyword,
                        dataSet.licenseInfo.license.stringValue(),
                        dataSet.licenseInfo.rights.stringValue(),
                        dataSet.description,
                        dataSet.distribution.title,
                        dataSet.distribution.description,
                        dataSet.distribution.downloadUrl,
                        dataSet.distribution.temporalResolution,
                        dataSet.distribution.accurualPeriodicity.stringValue(),
                        dataSet.distribution.spatial,
                        dataSet.distribution.temporal
                ))
                .from(dataSet)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
    }
}
