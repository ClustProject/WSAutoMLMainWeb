package kr.co.automl.domain.metadata.service;

import kr.co.automl.domain.metadata.domain.dataset.DataSet;
import kr.co.automl.domain.metadata.domain.dataset.DataSetQueryRepository;
import kr.co.automl.domain.metadata.dto.MetadataResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class MetadataReader {

    private final DataSetQueryRepository dataSetQueryRepository;

    @Transactional(readOnly = true)
    public List<MetadataResponse> readAll(Pageable pageable) {
        List<DataSet> allDataSets = dataSetQueryRepository.findAllDataSets(pageable);

        return allDataSets.stream()
                .map(MetadataResponse::from)
                .collect(toList());
    }
}
