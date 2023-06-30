package kr.co.automl.domain.metadata.domain.result;

import java.util.List;

public interface MlResultQueryRepository {

    List<MlResult> findAll();

    List<MlResult> findAllByEmail(String email);

    Long countMlResult();

    void deleteById(Long id);
}
