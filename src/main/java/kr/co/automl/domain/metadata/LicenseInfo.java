package kr.co.automl.domain.metadata;

public record LicenseInfo(
        License license,
        Right right
) {

    public LicenseInfo(String licenseName, String right) {
        this(
                License.of(licenseName, right),
                Right.ofString(right)
        );
    }

    public LicenseInfo(License license, Right right) {
        this.license = license;
        this.right = right;
    }
}
