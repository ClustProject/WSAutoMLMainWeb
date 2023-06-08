package kr.co.automl.infra;

import org.springframework.data.jpa.repository.JpaRepository;

import kr.co.automl.domain.metadata.domain.result.MlResult;

public interface JpaMlResultRepository extends JpaRepository<MlResult, Long> {

}
