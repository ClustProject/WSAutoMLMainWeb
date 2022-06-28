package kr.co.automl.domain.metadata;

public record LicenseInfo(
        License license,
        Rights rights
) {

    public static LicenseInfo of(String licenseName, String rightsName) {
        License license = License.of(licenseName, rightsName);
        Rights rights = Rights.ofString(rightsName);

        return new LicenseInfo(license, rights);
    }
}
