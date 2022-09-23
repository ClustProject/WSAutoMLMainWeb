package kr.co.automl.domain.metadata.domain.dataset.dto;

import lombok.Builder;

import javax.validation.constraints.NotBlank;

import static kr.co.automl.domain.metadata.dto.CreateMetaDataAttributes.NOT_BLANK_MESSAGE_SUFFIX;


public record CreateDataSetAttributes(
        @NotBlank(message = "데이터셋 제목" + NOT_BLANK_MESSAGE_SUFFIX)
        String title,

        @NotBlank(message = "구축 기관" + NOT_BLANK_MESSAGE_SUFFIX)
        String publisher,

        @NotBlank(message = "생성 기관" + NOT_BLANK_MESSAGE_SUFFIX)
        String creator,

        @NotBlank(message = "담당자 이름" + NOT_BLANK_MESSAGE_SUFFIX)
        String contactPointName,

        @NotBlank(message = "유형" + NOT_BLANK_MESSAGE_SUFFIX)
        String type,

        @NotBlank(message = "키워드" + NOT_BLANK_MESSAGE_SUFFIX)
        String keyword,

        @NotBlank(message = "라이센스" + NOT_BLANK_MESSAGE_SUFFIX)
        String license,

        @NotBlank(message = "권한" + NOT_BLANK_MESSAGE_SUFFIX)
        String rights,

        @NotBlank(message = "데이터셋 설명" + NOT_BLANK_MESSAGE_SUFFIX)
        String description

) {

    @Builder
    public CreateDataSetAttributes {
    }
}
