package kr.co.automl.domain.metadata.service;

import kr.co.automl.domain.metadata.domain.catalog.Catalog;
import kr.co.automl.domain.metadata.domain.dataset.DataSet;
import kr.co.automl.domain.metadata.domain.dataset.DataSetQueryRepository;
import kr.co.automl.domain.metadata.domain.dataset.DataSetRepository;
import kr.co.automl.domain.metadata.domain.dataset.exceptions.CannotFindDataSetException;
import kr.co.automl.domain.metadata.domain.distribution.Distribution;
import kr.co.automl.domain.metadata.dto.CreateMetaDataAttributes;
import kr.co.automl.domain.metadata.dto.MetadataResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
public class MetadataService {

    private final DataSetRepository dataSetRepository;
    private final DataSetQueryRepository dataSetQueryRepository;

    public MetadataService(DataSetRepository dataSetRepository, DataSetQueryRepository dataSetQueryRepository) {
        this.dataSetRepository = dataSetRepository;
        this.dataSetQueryRepository = dataSetQueryRepository;
    }

    @Transactional
    public void save(CreateMetaDataAttributes attributes) {
        Catalog catalog = Catalog.from(attributes.createCatalogAttributes());
        Distribution distribution = Distribution.from(attributes.createDistributionAttributes());

        DataSet dataSet = DataSet.from(attributes.createDataSetAttributes());
        dataSet.setRelation(catalog, distribution);

        dataSetRepository.save(dataSet);
    }

    @Transactional
    public void remove(Long id) {
        if (!dataSetRepository.existsById(id)) {
            throw new CannotFindDataSetException(id);
        }

        dataSetRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<MetadataResponse> readAll() {
        List<DataSet> allDataSets = dataSetQueryRepository.findAll();

        return allDataSets.stream()
                .map(MetadataResponse::from)
                .collect(toList());
    }
}