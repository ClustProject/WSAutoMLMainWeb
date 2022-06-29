package kr.co.automl.domain.metadata;

import kr.co.automl.domain.metadata.category.CategoryEntity;
import kr.co.automl.domain.metadata.category.dto.CategoryDto;
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

    private CategoryEntity category;
    private DataSetEntity dataSet;
    private DistributionEntity distribution;

    public static MetaDataEntity create(
            String description,
            CategoryDto categoryDto,
            DataSetDto dataSetDto,
            DistributionDto distributionDto
    ) {

        return MetaDataEntity.builder()
                .description(description)
                .category(CategoryEntity.from(categoryDto))
                .dataSet(DataSetEntity.from(dataSetDto))
                .distribution(DistributionEntity.from(distributionDto))
                .build();
    }

    @Builder
    private MetaDataEntity(String description, CategoryEntity category, DataSetEntity dataSet, DistributionEntity distribution) {
        this.description = description;
        this.category = category;
        this.dataSet = dataSet;
        this.distribution = distribution;
    }
}
