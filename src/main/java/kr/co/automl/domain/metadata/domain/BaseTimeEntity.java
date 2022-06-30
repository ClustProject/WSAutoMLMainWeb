package kr.co.automl.domain.metadata.domain;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.MappedSuperclass;
import java.time.LocalDate;

/**
 * 시간 객체
 */
@MappedSuperclass
public abstract class BaseTimeEntity {

    @CreatedDate
    private LocalDate issued;

    @LastModifiedDate
    private LocalDate modified;
}
