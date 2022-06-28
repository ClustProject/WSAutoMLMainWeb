package kr.co.automl.domain.metadata.dataset;

import kr.co.automl.domain.metadata.BaseTimeEntity;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode
public class DataSet extends BaseTimeEntity {

    private long id;

    private String title;
    private Organization organization;
    private Type type;
    private String keyword;
    private LicenseInfo licenseInfo;
    private String description;

    public static DataSet create(
            String title,
            String publisher,
            String creatorName,
            String contactPointName,
            String typeName,
            String keyword,
            String licenseName,
            String rightsName,
            String description
    ) {
        Organization organization = Organization.of(publisher, creatorName, contactPointName);

        Type type = Type.ofName(typeName);

        LicenseInfo licenseInfo = LicenseInfo.of(licenseName, rightsName);

        return new DataSet(title, organization, type, keyword, licenseInfo, description);
    }

    DataSet(String title, Organization organization, Type type, String keyword, LicenseInfo licenseInfo, String description) {
        this.title = title;
        this.organization = organization;
        this.type = type;
        this.keyword = keyword;
        this.licenseInfo = licenseInfo;
        this.description = description;
    }
}
