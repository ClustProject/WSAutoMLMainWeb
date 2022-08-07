package kr.co.automl.domain.metadata.domain.dataset;

import org.springframework.data.domain.Pageable;

import java.util.List;

public interface DataSetQueryRepository {
    List<DataSet> findAll(Pageable pageable);
}
