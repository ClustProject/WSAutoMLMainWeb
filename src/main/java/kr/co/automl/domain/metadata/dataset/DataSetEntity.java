package kr.co.automl.domain.metadata.dataset;

import kr.co.automl.domain.metadata.BaseTimeEntity;
import kr.co.automl.domain.metadata.dataset.dto.DataSetDto;
import lombok.Builder;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode
public class DataSetEntity extends BaseTimeEntity {

    private long id;

    private String title;
    private Organization organization;
    private Type type;
    private String keyword;
    private LicenseInfo licenseInfo;
    private String description;

    public static DataSetEntity create(
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

        return new DataSetEntity(title, organization, type, keyword, licenseInfo, description);
    }

    @Builder
    private DataSetEntity(String title, Organization organization, Type type, String keyword, LicenseInfo licenseInfo, String description) {
        this.title = title;
        this.organization = organization;
        this.type = type;
        this.keyword = keyword;
        this.licenseInfo = licenseInfo;
        this.description = description;
    }

    public static DataSetEntity from(DataSetDto dataSetDto) {
        return create(
                dataSetDto.title(),
                dataSetDto.publisher(),
                dataSetDto.creator(),
                dataSetDto.contactPointName(),
                dataSetDto.type(),
                dataSetDto.keyword(),
                dataSetDto.license(),
                dataSetDto.rights(),
                dataSetDto.description()
        );
    }
}
