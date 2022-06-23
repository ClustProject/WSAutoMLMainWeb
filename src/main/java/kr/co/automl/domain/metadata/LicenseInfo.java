package kr.co.automl.domain.metadata;

public record LicenseInfo(
        License license,
        Rights rights
) {

    public LicenseInfo(String licenseName, String rightsString) {
        this(
                License.of(licenseName, rightsString),
                Rights.ofString(rightsString)
        );
    }

    public LicenseInfo(License license, Rights rights) {
        this.license = license;
        this.rights = rights;
    }
}
