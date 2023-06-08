package kr.co.automl.domain.metadata.domain.dataset.dto;

import static kr.co.automl.domain.metadata.dto.CreateMetaDataAttributes.NOT_BLANK_MESSAGE_SUFFIX;

import java.util.Date;

import javax.validation.constraints.NotBlank;

import lombok.Builder;

public record CreateDataSetAttributes(
        @NotBlank(message = "데이터셋 제목" + NOT_BLANK_MESSAGE_SUFFIX) String title,

        // 클라이언트로부터 입력되는 값이 아니라 자동으로 설정되는 값이므로, 이들은 @NotBlank 검증 어노테이션에서 제외할 수 있습니다.
        // @NotBlank(message = "등록 일자" + NOT_BLANK_MESSAGE_SUFFIX) Date issued,
        // @NotBlank(message = "수정 일자" + NOT_BLANK_MESSAGE_SUFFIX) Date modified,

        @NotBlank(message = "구축 기관" + NOT_BLANK_MESSAGE_SUFFIX) String publisher,

        @NotBlank(message = "생성 기관" + NOT_BLANK_MESSAGE_SUFFIX) String creator,

        @NotBlank(message = "담당자 이름" + NOT_BLANK_MESSAGE_SUFFIX) String contactPointName,

        @NotBlank(message = "유형" + NOT_BLANK_MESSAGE_SUFFIX) String type,

        @NotBlank(message = "키워드" + NOT_BLANK_MESSAGE_SUFFIX) String keyword,

        @NotBlank(message = "라이센스" + NOT_BLANK_MESSAGE_SUFFIX) String license,

        @NotBlank(message = "권한" + NOT_BLANK_MESSAGE_SUFFIX) String rights,

        @NotBlank(message = "데이터셋 설명" + NOT_BLANK_MESSAGE_SUFFIX) String description

) {

    @Builder
    public CreateDataSetAttributes {
    }
}
