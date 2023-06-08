package kr.co.automl.domain.metadata.domain.result.dto;

import java.time.LocalDateTime;

import lombok.Builder;

public record ResultResponse(long id, String varNm, String varTgYn, String varUseYn, String argNm, String argParam,
        String modelNm, String metric, LocalDateTime date, String state, String modelUrl) {
    @Builder
    public ResultResponse {

    }

}
