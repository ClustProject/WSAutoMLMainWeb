package kr.co.automl.domain.metadata.domain.distribution.dto;

import lombok.Builder;

import javax.validation.constraints.NotBlank;

import static kr.co.automl.domain.metadata.dto.CreateMetaDataAttributes.NOT_BLANK_MESSAGE_SUFFIX;

public record CreateDistributionAttributes(

        // a.csv 등의 파일 이름
        @NotBlank(message = "배포 제목" + NOT_BLANK_MESSAGE_SUFFIX) String title,

        @NotBlank(message = "배포 설명" + NOT_BLANK_MESSAGE_SUFFIX) String description,

        // S3에서 파일 업로드 시 생성되는 다운로드 URL
        @NotBlank(message = "다운로드 URL" + NOT_BLANK_MESSAGE_SUFFIX) String downloadUrl,

        @NotBlank(message = "시간 단위" + NOT_BLANK_MESSAGE_SUFFIX) String temporalResolution,

        String accrualPeriodicty,

        String spatial,

        String temporal) {

    @Builder
    public CreateDistributionAttributes {
    }
}
