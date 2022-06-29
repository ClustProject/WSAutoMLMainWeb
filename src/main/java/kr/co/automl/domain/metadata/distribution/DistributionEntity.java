package kr.co.automl.domain.metadata.distribution;

import kr.co.automl.domain.metadata.distribution.dto.DistributionDto;
import lombok.Builder;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode
public class DistributionEntity {

    private long id;

    private String downloadUrl;
    private String timeStamp;
    private AccurualPeriodicity accurualPeriodicity;
    private String spatial;
    private String timeInfo;

    public static DistributionEntity create(String distribution, String timeStamp, String accurualPeriodicityName, String spatial, String timeInfo) {
        return DistributionEntity.builder()
                .downloadUrl(distribution)
                .timeStamp(timeStamp)
                .accurualPeriodicity(AccurualPeriodicity.ofName(accurualPeriodicityName))
                .spatial(spatial)
                .timeInfo(timeInfo)
                .build();
    }

    @Builder
    private DistributionEntity(String downloadUrl, String timeStamp, AccurualPeriodicity accurualPeriodicity, String spatial, String timeInfo) {
        this.downloadUrl = downloadUrl;
        this.timeStamp = timeStamp;
        this.accurualPeriodicity = accurualPeriodicity;
        this.spatial = spatial;
        this.timeInfo = timeInfo;
    }

    public static DistributionEntity from(DistributionDto distributionDto) {
        return create(
                distributionDto.distribution(),
                distributionDto.timeStamp(),
                distributionDto.accurualPeriodicity(),
                distributionDto.spatial(),
                distributionDto.timeInfo()
        );
    }
}
