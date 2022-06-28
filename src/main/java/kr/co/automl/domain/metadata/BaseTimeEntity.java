package kr.co.automl.domain.metadata;

import java.time.LocalDate;

/**
 * 시간 객체
 */
public abstract class BaseTimeEntity {
    private LocalDate createdDate;
    private LocalDate lastModifiedDate;
}
