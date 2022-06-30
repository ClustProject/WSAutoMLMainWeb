package kr.co.automl.domain.metadata.dataset.dto;

import lombok.Builder;

public record DataSetDto(
        String title,
        String publisher,
        String creator,
        String contactPointName,
        String typeName,
        String keyword,
        String license,
        String rights,
        String description
) {

    @Builder
    public DataSetDto {
    }
}
