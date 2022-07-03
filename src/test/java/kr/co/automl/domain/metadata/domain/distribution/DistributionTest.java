package kr.co.automl.domain.metadata.domain.distribution;

import kr.co.automl.domain.metadata.domain.distribution.dto.CreateDistributionAttributes;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class DistributionTest {

    public static Distribution createDefaultFixture() {
        return Distribution.builder()
                .title("destribution title")
                .description("destribution description")
                .downloadUrl("downloadUrl")
                .temporalResolution("temporalResolution")
                .accurualPeriodicity(AccurualPeriodicity.DAY)
                .spatial("spatial")
                .temporal("temporal")
                .build();
    }

    @Test
    void from_생성_테스트() {
        CreateDistributionAttributes createDistributionAttributes = CreateDistributionAttributes.builder()
                .title("destribution title")
                .description("destribution description")
                .downloadUrl("downloadUrl")
                .temporalResolution("temporalResolution")
                .accurualPeriodicityName("일")
                .spatial("spatial")
                .temporal("temporal")
                .build();

        Distribution distribution = Distribution.from(createDistributionAttributes);

        assertThat(distribution.getTitle()).isEqualTo("destribution title");
        assertThat(distribution.getDescription()).isEqualTo("destribution description");
        assertThat(distribution.getDownloadUrl()).isEqualTo("downloadUrl");
        assertThat(distribution.getTemporalResolution()).isEqualTo("temporalResolution");
        assertThat(distribution.getAccurualPeriodicity()).isEqualTo(AccurualPeriodicity.DAY);
        assertThat(distribution.getSpatial()).isEqualTo("spatial");
        assertThat(distribution.getTemporal()).isEqualTo("temporal");
    }
}
