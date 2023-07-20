package kr.co.automl.domain.metadata.domain.dataset;

import java.util.List;

public interface DataSetQueryRepository {
    List<DataSet> findAll();
}
