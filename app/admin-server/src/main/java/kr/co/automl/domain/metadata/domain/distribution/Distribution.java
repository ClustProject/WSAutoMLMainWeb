package kr.co.automl.domain.metadata.domain.distribution;

import kr.co.automl.domain.metadata.domain.distribution.dto.CreateDistributionAttributes;
import kr.co.automl.domain.metadata.domain.distribution.dto.DistributionResponse;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;

import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

/**
 * 배포 정보
 */
@Entity
@NoArgsConstructor(access = PROTECTED)
@Getter
public class Distribution {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "distribution_id")
    private Long id;

    @Column(name = "distribution_title")
    private String title;

    @Lob
    @Column(name = "distribution_description")
    private String description;

    private String downloadUrl;
    private String temporalResolution;

    private String accurualPeriodicity;

    @Column(name = "spatials") // spatial은 DB 예약어
    private String spatial;
    private String temporal;

    @Builder
    private Distribution(String title, String description, String downloadUrl, String temporalResolution, String accurualPeriodicity, String spatial, String temporal) {
        this.title = title;
        this.description = description;
        this.downloadUrl = downloadUrl;
        this.temporalResolution = temporalResolution;
        this.accurualPeriodicity = accurualPeriodicity;
        this.spatial = spatial;
        this.temporal = temporal;
    }

    /**
     * 생성한 배포 정보를 리턴합니다.
     * @param attributes 배포 정보 생성에 필요한 요소들
     * @return 생성한 배봎 정보
     */
    public static Distribution from(CreateDistributionAttributes attributes) {
        return Distribution.builder()
                .title(attributes.title())
                .description(attributes.description())
                .downloadUrl(attributes.downloadUrl())
                .temporalResolution(attributes.temporalResolution())
                .accurualPeriodicity(attributes.accurualPeriodicity())
                .spatial(attributes.spatial())
                .temporal(attributes.temporal())
                .build();
    }

    /**
     * 응답 객체를 리턴합니다. 주로 DTO에서 호출합니다.
     * @return 변환된 응답 객체
     */
    public DistributionResponse toResponse() {
        return DistributionResponse.builder()
                .title(this.title)
                .description(this.description)
                .downloadUrl(this.downloadUrl)
                .temporalResolution(this.temporalResolution)
                .accurualPeriodicity(this.accurualPeriodicity)
                .spatial(this.spatial)
                .temporal(this.temporal)
                .build();
    }
}
