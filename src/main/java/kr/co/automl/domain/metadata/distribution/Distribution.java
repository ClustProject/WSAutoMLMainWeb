package kr.co.automl.domain.metadata.distribution;

import kr.co.automl.domain.metadata.distribution.converter.AccuralPeriodicityConverter;
import kr.co.automl.domain.metadata.distribution.dto.CreateDistributionAttributes;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import static lombok.AccessLevel.PROTECTED;

@Entity
@NoArgsConstructor(access = PROTECTED)
@Getter(AccessLevel.PACKAGE)
public class Distribution {

    @Id
    @GeneratedValue
    @Column(name = "distribution_id")
    private long id;

    private String downloadUrl;
    private String timeStamp;
    private String temporalResolution;

    @Convert(converter = AccuralPeriodicityConverter.class)
    private AccurualPeriodicity accurualPeriodicity;

    private String spatial;
    private String temporal;

    @Builder
    private Distribution(String downloadUrl, String timeStamp, String temporalResolution, AccurualPeriodicity accurualPeriodicity, String spatial, String temporal) {
        this.downloadUrl = downloadUrl;
        this.timeStamp = timeStamp;
        this.temporalResolution = temporalResolution;
        this.accurualPeriodicity = accurualPeriodicity;
        this.spatial = spatial;
        this.temporal = temporal;
    }

    public static Distribution from(CreateDistributionAttributes createDistributionAttributes) {
        return Distribution.builder()
                .downloadUrl(createDistributionAttributes.downloadUrl())
                .timeStamp(createDistributionAttributes.timeStamp())
                .temporalResolution(createDistributionAttributes.temporalResolution())
                .accurualPeriodicity(AccurualPeriodicity.ofName(createDistributionAttributes.accurualPeriodicityName()))
                .spatial(createDistributionAttributes.spatial())
                .temporal(createDistributionAttributes.temporal())
                .build();
    }
}
