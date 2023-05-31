package kr.co.automl.infra;

import kr.co.automl.domain.metadata.domain.dataset.DataSet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaDataSetRepository extends JpaRepository<DataSet, Long> {
}
