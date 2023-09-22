package kr.co.automl.domain.conzon.dto;

import java.time.LocalDateTime;

import lombok.Builder;

public record ConzonImputatedResponse(Long id, String conzonId, String conzonName, LocalDateTime conzonDate,
        String conzonData) {

    @Builder
    public ConzonImputatedResponse {

    }
}
