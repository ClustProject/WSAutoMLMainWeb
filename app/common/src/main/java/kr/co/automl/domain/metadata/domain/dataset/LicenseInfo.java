package kr.co.automl.domain.metadata.domain.dataset;

import kr.co.automl.domain.metadata.domain.dataset.converter.LicenseConverter;
import kr.co.automl.domain.metadata.domain.dataset.converter.RightsConverter;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Convert;
import javax.persistence.Embeddable;

import static lombok.AccessLevel.PROTECTED;

/**
 * 라이센스 정보
 */
@Embeddable
@NoArgsConstructor(access = PROTECTED)
@Getter
@EqualsAndHashCode
public class LicenseInfo {

    @Convert(converter = LicenseConverter.class)
    private License license;

    @Convert(converter = RightsConverter.class)
    private Rights rights;

    public LicenseInfo(License license, Rights rights) {
        this.license = license;
        this.rights = rights;
    }

    public static LicenseInfo of(String licenseName, String rightsName) {
        License license = License.valueOf(licenseName);
        Rights rights = license.findRightsByName(rightsName);

        return new LicenseInfo(license, rights);
    }
}
