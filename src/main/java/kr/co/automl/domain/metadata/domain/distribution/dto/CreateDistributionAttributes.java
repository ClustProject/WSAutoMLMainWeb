package kr.co.automl.domain.metadata.domain.distribution.dto;

import lombok.Builder;

import javax.validation.constraints.NotBlank;

import static kr.co.automl.domain.metadata.dto.CreateMetaDataAttributes.NOT_BLANK_MESSAGE_SUFFIX;

public record CreateDistributionAttributes(

        @NotBlank(message = "배포 제목" + NOT_BLANK_MESSAGE_SUFFIX)
        String title,

        @NotBlank(message = "배포 설명" + NOT_BLANK_MESSAGE_SUFFIX)
        String description,

        @NotBlank(message = "다운로드 URL" + NOT_BLANK_MESSAGE_SUFFIX)
        String downloadUrl,

        @NotBlank(message = "측정 단위" + NOT_BLANK_MESSAGE_SUFFIX)
        String temporalResolution,

        @NotBlank(message = "제공 주기" + NOT_BLANK_MESSAGE_SUFFIX)
        String accurualPeriodicityName,

        @NotBlank(message = "공간 정보" + NOT_BLANK_MESSAGE_SUFFIX)
        String spatial,

        @NotBlank(message = "시간 정보" + NOT_BLANK_MESSAGE_SUFFIX)
        String temporal
) {

    @Builder
    public CreateDistributionAttributes {
    }
}
