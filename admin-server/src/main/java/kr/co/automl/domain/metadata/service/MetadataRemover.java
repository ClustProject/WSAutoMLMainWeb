package kr.co.automl.domain.metadata.service;

import kr.co.automl.domain.metadata.domain.dataset.DataSetRepository;
import kr.co.automl.domain.metadata.domain.dataset.exceptions.CannotFindDataSetException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 메타데이터 삭제 담당
 */
@Service
public class MetadataRemover {

    private final DataSetRepository dataSetRepository;

    public MetadataRemover(DataSetRepository dataSetRepository) {
        this.dataSetRepository = dataSetRepository;
    }

    /**
     * 데이터셋을 삭제합니다.
     * @param id 삭제할 데이터셋 식별자
     */
    @Transactional
    public void remove(Long id) {
        if (!dataSetRepository.existsById(id)) {
            throw new CannotFindDataSetException(id);
        }

        dataSetRepository.deleteById(id);
    }
}
