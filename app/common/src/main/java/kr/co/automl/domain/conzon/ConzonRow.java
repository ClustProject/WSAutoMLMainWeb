package kr.co.automl.domain.conzon;

import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import kr.co.automl.domain.conzon.dto.ConzonRowResponse;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = PROTECTED)
@Getter
public class ConzonRow {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "conzon_idx")
    private Long id;

    @Column(name = "conzon_id")
    private String conzonId;

    @Column(name = "conzon_name")
    private String conzonName;

    @Column(name = "conzon_date")
    private LocalDateTime conzonDate;

    @Column(name = "conzon_data")
    private String conzonData;

    @Builder
    private ConzonRow(Long id, String conzonId, String conzonName, LocalDateTime conzonDate, String conzonData) {
        this.id = id;
        this.conzonId = conzonId;
        this.conzonName = conzonName;
        this.conzonDate = conzonDate;
        this.conzonData = conzonData;
    }

    /**
     * 응답 객체를 리턴합니다. 주로 DTO에서 호출합니다.
     * 
     * @return 변환된 응답 객체
     */
    public ConzonRowResponse toResponse() {
        return ConzonRowResponse.builder()
                .id(this.id)
                .conzonId(this.conzonId)
                .conzonName(this.conzonName)
                .conzonDate(this.conzonDate)
                .conzonData(this.conzonData)
                .build();
    }
}
