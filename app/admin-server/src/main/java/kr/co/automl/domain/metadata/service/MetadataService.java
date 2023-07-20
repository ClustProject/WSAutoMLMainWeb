package kr.co.automl.domain.metadata.service;

import static java.util.stream.Collectors.toList;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.automl.domain.metadata.domain.catalog.Catalog;
import kr.co.automl.domain.metadata.domain.dataset.DataSet;
import kr.co.automl.domain.metadata.domain.dataset.DataSetQueryRepository;
import kr.co.automl.domain.metadata.domain.dataset.DataSetRepository;
import kr.co.automl.domain.metadata.domain.dataset.exceptions.CannotFindDataSetException;
import kr.co.automl.domain.metadata.domain.distribution.Distribution;
import kr.co.automl.domain.metadata.dto.CreateMetaDataAttributes;
import kr.co.automl.domain.metadata.dto.MetadataResponse;

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

    public Page<MetadataResponse> readAll(Pageable pageable) {
        Page<DataSet> allDataSets = dataSetQueryRepository.findAll(pageable);
        List<MetadataResponse> contents = allDataSets.getContent().stream()
                .map(MetadataResponse::from)
                .collect(toList());

        return new PageImpl<>(contents, pageable, allDataSets.getTotalElements());
    }
}