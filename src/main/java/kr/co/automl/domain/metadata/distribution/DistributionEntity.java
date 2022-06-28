package kr.co.automl.domain.metadata.distribution;

import lombok.Builder;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode
public class DistributionEntity {

    private long id;

    private String distribution;
    private String timeStamp;
    private AccurualPeriodicity accurualPeriodicity;
    private String spatial;
    private String timeInfo;

    public static DistributionEntity create(String distribution, String timeStamp, String accurualPeriodicityName, String spatial, String timeInfo) {
        return DistributionEntity.builder()
                .distribution(distribution)
                .timeStamp(timeStamp)
                .accurualPeriodicity(AccurualPeriodicity.ofName(accurualPeriodicityName))
                .spatial(spatial)
                .timeInfo(timeInfo)
                .build();
    }

    @Builder
    private DistributionEntity(String distribution, String timeStamp, AccurualPeriodicity accurualPeriodicity, String spatial, String timeInfo) {
        this.distribution = distribution;
        this.timeStamp = timeStamp;
        this.accurualPeriodicity = accurualPeriodicity;
        this.spatial = spatial;
        this.timeInfo = timeInfo;
    }
}
