package kr.co.automl.domain.metadata;

import java.time.LocalDateTime;

/**
 * 시간 객체
 */
public record BaseTimeEntity(
        LocalDateTime createdDate,
        LocalDateTime lastUpdatedDate
) {
}
