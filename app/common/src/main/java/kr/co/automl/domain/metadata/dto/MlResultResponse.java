package kr.co.automl.domain.metadata.dto;

import kr.co.automl.domain.metadata.domain.dataset.DataSet;
import kr.co.automl.domain.metadata.domain.dataset.dto.DataSetResponse;
import kr.co.automl.domain.metadata.domain.distribution.dto.DistributionResponse;
import kr.co.automl.domain.metadata.domain.result.MlResult;
import kr.co.automl.domain.metadata.domain.result.dto.ResultResponse;
import kr.co.automl.domain.user.dto.UserResponse;
import lombok.Builder;

public record MlResultResponse(
        ResultResponse result,
        DataSetResponse dataSet,
        UserResponse user,
        DistributionResponse distribution) {

    @Builder
    public MlResultResponse {
    }

    public static MlResultResponse from(MlResult result, DataSet dataSet) {
        return MlResultResponse.builder()
                .result(result.toResponse())
                .dataSet(result.toDataSetResponse())
                .user(result.toUserResponse())
                .distribution(dataSet.toDistributionResponse())
                .build();
    }
}