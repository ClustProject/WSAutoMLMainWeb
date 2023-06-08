package kr.co.automl.domain.metadata.domain.result;

import java.util.List;

import org.springframework.data.domain.Pageable;

public interface MlResultQueryRepository {

    List<MlResult> findAll(Pageable pageable);

    List<MlResult> findAllByEmail(String email, Pageable pageable);

    Long countMlResult();

    void deleteById(Long id);
}
