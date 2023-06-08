package kr.co.automl.domain.metadata.distribution;

import kr.co.automl.domain.metadata.domain.distribution.Distribution;

public class TestDistributionFactory {

    private TestDistributionFactory() {
    }

    public static Distribution createDefaultFixture() {
        return Distribution.builder()
                .title("destribution title")
                .description("destribution description")
                .downloadUrl("downloadUrl")
                .temporalResolution("temporalResolution")
                .accrualPeriodicty("일")
                .spatial("spatial")
                .temporal("temporal")
                .build();
    }

}
