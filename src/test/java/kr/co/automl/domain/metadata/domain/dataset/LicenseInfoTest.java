package kr.co.automl.domain.metadata.domain.dataset;

import kr.co.automl.domain.metadata.domain.dataset.License;
import kr.co.automl.domain.metadata.domain.dataset.LicenseInfo;
import kr.co.automl.domain.metadata.domain.dataset.Rights;
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
