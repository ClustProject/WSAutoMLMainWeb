package kr.co.automl.domain.metadata.dataset;

import kr.co.automl.domain.metadata.BaseTimeEntity;
import kr.co.automl.domain.metadata.dataset.dto.CreateDataSetAttributes;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

@Getter(AccessLevel.PACKAGE)
public class DataSet extends BaseTimeEntity {

    private long id;

    private String title;
    private Organization organization;
    private Type type;
    private String keyword;
    private LicenseInfo licenseInfo;
    private String description;

    @Builder
    private DataSet(String title, Organization organization, Type type, String keyword, LicenseInfo licenseInfo, String description) {
        this.title = title;
        this.organization = organization;
        this.type = type;
        this.keyword = keyword;
        this.licenseInfo = licenseInfo;
        this.description = description;
    }

    public static DataSet from(CreateDataSetAttributes createDataSetAttributes) {
        return DataSet.builder()
                .title(createDataSetAttributes.title())
                .organization(Organization.of(
                        createDataSetAttributes.publisher(),
                        createDataSetAttributes.creator(),
                        createDataSetAttributes.contactPointName()
                ))
                .type(Type.ofName(createDataSetAttributes.typeName()))
                .keyword(createDataSetAttributes.keyword())
                .description(createDataSetAttributes.description())
                .licenseInfo(LicenseInfo.of(
                        createDataSetAttributes.license(), createDataSetAttributes.rights()
                ))
                .build();
    }

}
