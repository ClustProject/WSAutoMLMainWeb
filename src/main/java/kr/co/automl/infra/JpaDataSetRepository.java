package kr.co.automl.infra;

import kr.co.automl.domain.metadata.domain.dataset.DataSet;
import kr.co.automl.domain.metadata.domain.dataset.DataSetRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaDataSetRepository extends DataSetRepository, JpaRepository<DataSet, Long> {
}
