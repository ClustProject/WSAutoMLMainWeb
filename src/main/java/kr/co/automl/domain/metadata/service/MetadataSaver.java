package kr.co.automl.domain.metadata.service;

import kr.co.automl.domain.metadata.domain.catalog.Catalog;
import kr.co.automl.domain.metadata.domain.dataset.DataSet;
import kr.co.automl.domain.metadata.domain.dataset.DataSetRepository;
import kr.co.automl.domain.metadata.domain.distribution.Distribution;
import kr.co.automl.domain.metadata.dto.CreateMetaDataAttributes;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MetadataSaver {
    private final DataSetRepository dataSetRepository;

    public MetadataSaver(DataSetRepository dataSetRepository) {
        this.dataSetRepository = dataSetRepository;
    }

    @Transactional
    public void save(CreateMetaDataAttributes attributes) {
        Catalog catalog = Catalog.from(attributes.createCatalogAttributes());
        Distribution distribution = Distribution.from(attributes.createDistributionAttributes());

        DataSet dataSet = DataSet.from(attributes.createDataSetAttributes());
        dataSet.setRelation(catalog, distribution);

        dataSetRepository.save(dataSet);
    }
}
