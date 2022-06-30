package kr.co.automl.domain.metadata.distribution;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class DistributionEntityTest {

    @Test
    void create() {
        DistributionEntity distribution = DistributionEntity.create(
                "downloadUrl",
                "timeStamp",
                "일",
                "spatial",
                "timeInfo"
        );

        assertThat(distribution).isEqualTo(DistributionEntity.builder()
                .downloadUrl("downloadUrl")
                .timeStamp("timeStamp")
                .accurualPeriodicity(AccurualPeriodicity.DAY)
                .spatial("spatial")
                .timeInfo("timeInfo")
                .build());
    }
}
