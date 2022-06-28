package kr.co.automl.domain.metadata.dataset;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class LicenseInfoTest {

    @Test
    void of() {
        LicenseInfo licenseInfo = LicenseInfo.of("CLUST", "All");

        assertThat(licenseInfo).isEqualTo(new LicenseInfo(
                License.CLUST, Rights.ALL
        ));
    }
}
