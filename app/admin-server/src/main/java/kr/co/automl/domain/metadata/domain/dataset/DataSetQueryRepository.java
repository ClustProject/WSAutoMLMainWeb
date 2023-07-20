package kr.co.automl.domain.metadata.domain.dataset;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface DataSetQueryRepository {
    Page<DataSet> findAll(Pageable pageable);
}
