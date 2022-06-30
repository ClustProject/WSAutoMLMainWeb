package kr.co.automl.domain.metadata.dataset;

import kr.co.automl.domain.metadata.BaseTimeEntity;
import kr.co.automl.domain.metadata.dataset.dto.DataSetDto;
import lombok.Builder;
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

    @Builder
    private DataSet(String title, Organization organization, Type type, String keyword, LicenseInfo licenseInfo, String description) {
        this.title = title;
        this.organization = organization;
        this.type = type;
        this.keyword = keyword;
        this.licenseInfo = licenseInfo;
        this.description = description;
    }

    public static DataSet from(DataSetDto dataSetDto) {
        return DataSet.builder()
                .title(dataSetDto.title())
                .organization(Organization.of(
                        dataSetDto.publisher(),
                        dataSetDto.creator(),
                        dataSetDto.contactPointName()
                ))
                .type(Type.ofName(dataSetDto.typeName()))
                .keyword(dataSetDto.keyword())
                .description(dataSetDto.description())
                .licenseInfo(LicenseInfo.of(
                        dataSetDto.license(), dataSetDto.rights()
                ))
                .build();
    }

}
