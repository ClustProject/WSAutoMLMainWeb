package kr.co.automl.domain.metadata.domain.distribution;

import kr.co.automl.domain.metadata.domain.distribution.converter.AccuralPeriodicityConverter;
import kr.co.automl.domain.metadata.domain.distribution.dto.CreateDistributionAttributes;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;

import static lombok.AccessLevel.PROTECTED;

@Entity
@NoArgsConstructor(access = PROTECTED)
@Getter(AccessLevel.PACKAGE)
public class Distribution {

    @Id
    @GeneratedValue
    @Column(name = "distribution_id")
    private long id;

    @Column(name = "distribution_title")
    private String title;

    @Lob
    @Column(name = "distribution_description")
    private String description;

    private String downloadUrl;
    private String temporalResolution;

    @Convert(converter = AccuralPeriodicityConverter.class)
    private AccurualPeriodicity accurualPeriodicity;

    private String spatial;
    private String temporal;

    @Builder
    private Distribution(String title, String description, String downloadUrl, String temporalResolution, AccurualPeriodicity accurualPeriodicity, String spatial, String temporal) {
        this.title = title;
        this.description = description;
        this.downloadUrl = downloadUrl;
        this.temporalResolution = temporalResolution;
        this.accurualPeriodicity = accurualPeriodicity;
        this.spatial = spatial;
        this.temporal = temporal;
    }

    public static Distribution from(CreateDistributionAttributes attributes) {
        return Distribution.builder()
                .title(attributes.title())
                .description(attributes.description())
                .downloadUrl(attributes.downloadUrl())
                .temporalResolution(attributes.temporalResolution())
                .accurualPeriodicity(AccurualPeriodicity.ofName(attributes.accurualPeriodicityName()))
                .spatial(attributes.spatial())
                .temporal(attributes.temporal())
                .build();
    }
}
