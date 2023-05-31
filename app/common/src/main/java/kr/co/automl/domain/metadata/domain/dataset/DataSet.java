package kr.co.automl.domain.metadata.domain.dataset;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToOne;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import kr.co.automl.domain.metadata.domain.BaseTimeEntity;
import kr.co.automl.domain.metadata.domain.catalog.Catalog;
import kr.co.automl.domain.metadata.domain.catalog.dto.CatalogResponse;
import kr.co.automl.domain.metadata.domain.dataset.converter.TypeConverter;
import kr.co.automl.domain.metadata.domain.dataset.dto.CreateDataSetAttributes;
import kr.co.automl.domain.metadata.domain.dataset.dto.DataSetResponse;
import kr.co.automl.domain.metadata.domain.distribution.Distribution;
import kr.co.automl.domain.metadata.domain.distribution.dto.DistributionResponse;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 데이터셋.
 *
 * 데이터에 대한 핵심 정보들을 가지고 있습니다.
 */
@Entity
@EnableJpaAuditing
@NoArgsConstructor(access = PROTECTED)
@Getter
public class DataSet extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "dataset_id")
    private Long id;

    private String title;

    @CreatedDate
    private LocalDate issued = LocalDate.now();

    @LastModifiedDate
    private LocalDate modified = LocalDate.now();

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
    private DataSet(Long id, String title, Organization organization, Type type,
            String keyword,
            LicenseInfo licenseInfo, String description) {
        this.id = id;
        this.title = title;
        this.organization = organization;
        this.type = type;
        this.keyword = keyword;
        this.licenseInfo = licenseInfo;
        this.description = description;
    }

    /**
     * 생성한 데이터셋을 리턴합니다.
     * 
     * @param attributes 데이터셋 생성에 필요한 요소들
     * @return 생성한 데이터셋
     */
    public static DataSet from(CreateDataSetAttributes attributes) {
        return DataSet.builder()
                .title(attributes.title())
                .organization(Organization.of(
                        attributes.publisher(),
                        attributes.creator(),
                        attributes.contactPointName()))
                .type(Type.ofName(attributes.type()))
                .keyword(attributes.keyword())
                .description(attributes.description())
                .licenseInfo(LicenseInfo.of(
                        attributes.license(), attributes.rights()))
                .build();
    }

    /**
     * 연관관계 편의 메서드. 양쪽의 연관관계를 모두 설정합니다.
     * 
     * @param catalog      카탈로그
     * @param distribution 배포 정보
     */
    public void setRelation(Catalog catalog, Distribution distribution) {
        this.catalog = catalog;
        catalog.setRelation(this);

        this.distribution = distribution;
    }

    /**
     * 응답 객체를 리턴합니다. 주로 DTO에서 호출합니다.
     * 
     * @return 변환된 응답 객체
     */
    public DataSetResponse toResponse() {
        return DataSetResponse.builder()
                .id(this.id)
                .title(this.title)
                .issued(this.issued)
                .modified(this.modified)
                .organization(this.organization)
                .type(this.type.getName())
                .keyword(this.keyword)
                .licenseInfo(this.licenseInfo)
                .description(this.description)
                .build();
    }

    /**
     * 카탈로그 응답 객체를 리턴합니다.
     * 
     * @return 카탈로그 응답 객체
     */
    public CatalogResponse toCatalogResponse() {
        return this.catalog.toResponse();
    }

    /**
     * 배포 정보 응답 객체를 리턴합니다.
     * 
     * @return 배포 정보 응답 객체
     */
    public DistributionResponse toDistributionResponse() {
        return this.distribution.toResponse();
    }
}
