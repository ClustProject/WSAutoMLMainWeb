package kr.co.automl.domain.metadata.domain.dataset;

import kr.co.automl.domain.metadata.dto.MetadataResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface DataSetQueryRepository {
    List<MetadataResponse> findAllDataSets(Pageable pageable);
}
