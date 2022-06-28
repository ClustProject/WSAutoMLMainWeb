package kr.co.automl.domain.metadata;

import kr.co.automl.domain.metadata.dataset.DataSetEntity;
import kr.co.automl.domain.metadata.distribution.DistributionEntity;

public class MetaDataEntity {

    private long id;

    private String description;

    private MetaDataEntity metaData;
    private DataSetEntity dataSet;
    private DistributionEntity distribution;
}
