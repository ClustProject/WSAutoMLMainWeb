package kr.co.automl.domain.metadata.domain.dataset;

import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;

import static lombok.AccessLevel.PROTECTED;

@Embeddable
@NoArgsConstructor(access = PROTECTED)
@EqualsAndHashCode
public class LicenseInfo {

    private License license;
    private Rights rights;

    public LicenseInfo(License license, Rights rights) {
        this.license = license;
        this.rights = rights;
    }

    public static LicenseInfo of(String licenseName, String rightsName) {
        License license = License.of(licenseName, rightsName);
        Rights rights = Rights.ofString(rightsName);

        return new LicenseInfo(license, rights);
    }
}
