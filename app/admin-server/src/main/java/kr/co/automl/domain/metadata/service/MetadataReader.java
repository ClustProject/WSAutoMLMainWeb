package kr.co.automl.domain.metadata.service;

import static java.util.stream.Collectors.toList;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.automl.domain.metadata.domain.dataset.DataSet;
import kr.co.automl.domain.metadata.domain.dataset.DataSetQueryRepository;
import kr.co.automl.domain.metadata.dto.MetadataResponse;

@Service
@Transactional(readOnly = true)
public class MetadataReader {

    private final DataSetQueryRepository dataSetQueryRepository;

    public MetadataReader(DataSetQueryRepository dataSetQueryRepository) {
        this.dataSetQueryRepository = dataSetQueryRepository;
    }

    public List<MetadataResponse> readAll() {
        List<DataSet> allDataSets = dataSetQueryRepository.findAll();

        return allDataSets.stream()
                .map(MetadataResponse::from)
                .collect(toList());
    }
}
