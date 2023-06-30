package kr.co.automl.domain.metadata.domain.result.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.automl.domain.metadata.domain.result.MlResult;
import kr.co.automl.domain.metadata.dto.MlResultResponse;
import kr.co.automl.domain.metadata.domain.result.MlResultQueryRepository;

import static java.util.stream.Collectors.toList;

@Service
@Transactional(readOnly = true)
public class MlResultReader {

    private final MlResultQueryRepository mlResultQueryRepository;

    public MlResultReader(MlResultQueryRepository mlResultQueryRepository) {
        this.mlResultQueryRepository = mlResultQueryRepository;
    }

    public List<MlResultResponse> readAll() {
        List<MlResult> allMlResults = mlResultQueryRepository.findAll();

        return allMlResults.stream()
                .map(result -> MlResultResponse.from(result, result.getDataSet()))
                .collect(toList());
    }

    public List<MlResultResponse> readAllByEmail(String email) {
        List<MlResult> allMlResults = mlResultQueryRepository.findAllByEmail(email);

        return allMlResults.stream()
                .map(result -> MlResultResponse.from(result, result.getDataSet()))
                .collect(toList());
    }

    public void deleteMlResultById(Long id) {
        mlResultQueryRepository.deleteById(id);
    }
}
