package kr.co.automl.domain.metadata.domain.dataset;

import kr.co.automl.domain.metadata.domain.BaseTimeEntity;
import kr.co.automl.domain.metadata.domain.catalog.Catalog;
import kr.co.automl.domain.metadata.domain.dataset.converter.TypeConverter;
import kr.co.automl.domain.metadata.domain.dataset.dto.CreateDataSetAttributes;
import kr.co.automl.domain.metadata.domain.distribution.Distribution;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToOne;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@NoArgsConstructor(access = PROTECTED)
@Getter(AccessLevel.PACKAGE)
public class DataSet extends BaseTimeEntity {

    @Id
    @GeneratedValue
    @Column(name = "dataset_id")
    private long id;

    private String title;

    @Embedded
    private Organization organization;

    @Convert(converter = TypeConverter.class)
    private Type type;

    private String keyword;

    @Embedded
    private LicenseInfo licenseInfo;

    @Lob
    private String description;

    @OneToOne(fetch = LAZY, cascade = ALL)
    @JoinColumn(name = "catalog_id")
    private Catalog catalog;

    @OneToOne(fetch = LAZY, cascade = ALL)
    @JoinColumn(name = "distribution_id")
    private Distribution distribution;

    @Builder
    private DataSet(String title, Organization organization, Type type, String keyword, LicenseInfo licenseInfo, String description) {
        this.title = title;
        this.organization = organization;
        this.type = type;
        this.keyword = keyword;
        this.licenseInfo = licenseInfo;
        this.description = description;
    }

    public static DataSet from(CreateDataSetAttributes attributes) {
        return DataSet.builder()
                .title(attributes.title())
                .organization(Organization.of(
                        attributes.publisher(),
                        attributes.creator(),
                        attributes.contactPointName()
                ))
                .type(Type.ofName(attributes.typeName()))
                .keyword(attributes.keyword())
                .description(attributes.description())
                .licenseInfo(LicenseInfo.of(
                        attributes.license(), attributes.rights()
                ))
                .build();
    }

}
