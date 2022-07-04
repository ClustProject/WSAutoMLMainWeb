package kr.co.automl.domain.metadata.domain.dataset;

import java.util.List;

public interface DataSetRepository {
    DataSet save(DataSet dataSet);

    List<DataSet> findAll();
}
