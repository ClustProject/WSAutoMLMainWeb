package kr.co.automl.domain.metadata;

import kr.co.automl.domain.metadata.catalog.CatalogEntity;
import kr.co.automl.domain.metadata.catalog.dto.CatalogDto;
import kr.co.automl.domain.metadata.dataset.DataSetEntity;
import kr.co.automl.domain.metadata.dataset.dto.DataSetDto;
import kr.co.automl.domain.metadata.distribution.DistributionEntity;
import kr.co.automl.domain.metadata.distribution.dto.DistributionDto;
import lombok.Builder;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode
public class MetaDataEntity {

    private long id;

    private String description;

    private CatalogEntity catalog;
    private DataSetEntity dataSet;
    private DistributionEntity distribution;

    public static MetaDataEntity create(
            String description,
            CatalogDto catalogDto,
            DataSetDto dataSetDto,
            DistributionDto distributionDto
    ) {

        return MetaDataEntity.builder()
                .description(description)
                .catalog(CatalogEntity.from(catalogDto))
                .dataSet(DataSetEntity.from(dataSetDto))
                .distribution(DistributionEntity.from(distributionDto))
                .build();
    }

    @Builder
    private MetaDataEntity(String description, CatalogEntity catalog, DataSetEntity dataSet, DistributionEntity distribution) {
        this.description = description;
        this.catalog = catalog;
        this.dataSet = dataSet;
        this.distribution = distribution;
    }
}
