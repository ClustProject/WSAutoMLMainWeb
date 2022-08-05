package kr.co.automl.domain.metadata.domain.dataset;

public interface DataSetRepository {
    DataSet save(DataSet dataSet);

    void deleteAll();

    void deleteById(Long id);

    boolean existsById(Long id);
}
