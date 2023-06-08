package kr.co.automl.domain.metadata.domain.result.api;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import kr.co.automl.domain.metadata.domain.result.service.MlResultReader;
import kr.co.automl.domain.metadata.dto.MlResultResponse;
import kr.co.automl.domain.user.dto.SessionUser;
import kr.co.automl.global.config.web.LoginUser;
import kr.co.automl.global.utils.web.dto.ListToDataResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class MlResultReadApi {

    private final MlResultReader mlResultReader;

    @GetMapping("mlResult")
    public ListToDataResponse<MlResultResponse> getAllMlResult(Pageable pageable) {
        List<MlResultResponse> mlResultResponses = mlResultReader.readAll(pageable);

        return new ListToDataResponse<>(mlResultResponses);
    }

    @GetMapping("mlResultById")
    public ListToDataResponse<MlResultResponse> getAllMlResult(@LoginUser SessionUser sessionUser, Pageable pageable) {
        List<MlResultResponse> mlResultResponses = mlResultReader.readAllByEmail(sessionUser.email(), pageable);

        return new ListToDataResponse<>(mlResultResponses);
    }

    @DeleteMapping("mlResult/{id}")
    public ResponseEntity<Void> deleteMlResultById(@PathVariable Long id) {
        mlResultReader.deleteMlResultById(id);
        return ResponseEntity.ok().build();
    }
}
