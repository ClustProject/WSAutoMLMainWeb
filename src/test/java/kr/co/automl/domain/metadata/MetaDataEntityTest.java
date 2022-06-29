package kr.co.automl.domain.metadata;

import kr.co.automl.domain.metadata.catalog.Catalog;
import kr.co.automl.domain.metadata.catalog.CatalogEntity;
import kr.co.automl.domain.metadata.catalog.Theme;
import kr.co.automl.domain.metadata.catalog.dto.CatalogDto;
import kr.co.automl.domain.metadata.dataset.Creator;
import kr.co.automl.domain.metadata.dataset.DataSetEntity;
import kr.co.automl.domain.metadata.dataset.License;
import kr.co.automl.domain.metadata.dataset.LicenseInfo;
import kr.co.automl.domain.metadata.dataset.Organization;
import kr.co.automl.domain.metadata.dataset.Rights;
import kr.co.automl.domain.metadata.dataset.Type;
import kr.co.automl.domain.metadata.dataset.dto.DataSetDto;
import kr.co.automl.domain.metadata.distribution.AccurualPeriodicity;
import kr.co.automl.domain.metadata.distribution.DistributionEntity;
import kr.co.automl.domain.metadata.distribution.dto.DistributionDto;
import org.junit.jupiter.api.Test;

import static kr.co.automl.domain.metadata.dataset.ContactPointTest.CONTACT_POINT1;
import static org.assertj.core.api.Assertions.assertThat;

class MetaDataEntityTest {

    @Test
    void create() {
        CatalogDto catalogDto = CatalogDto.builder()
                .name("대기 환경")
                .theme("공기질")
                .themeTaxonomy("")
                .build();
        DataSetDto dataSetDto = DataSetDto.builder()
                .title("")
                .publisher("")
                .creator("위세아이텍")
                .contactPointName("박주영")
                .type("이미지")
                .keyword("")
                .license("CLUST")
                .rights("All")
                .description("")
                .build();
        DistributionDto distributionDto = DistributionDto.builder()
                .distribution("")
                .timeStamp("")
                .accurualPeriodicity("월")
                .spatial("")
                .timeInfo("")
                .build();

        MetaDataEntity metadata = MetaDataEntity.create("", catalogDto, dataSetDto, distributionDto);

        assertThat(metadata).isEqualTo(MetaDataEntity.builder()
                .description("")
                .catalog(CatalogEntity.builder()
                        .catalog(Catalog.ATMOSPHERIC_ENVIRONMENT)
                        .theme(Theme.AIR_QUALITY)
                        .themeTaxonomy("")
                        .build())
                .dataSet(DataSetEntity.builder()
                        .title("")
                        .organization(Organization.builder()
                                .publisher("")
                                .creator(Creator.WISE_I_TECH)
                                .contactPoint(CONTACT_POINT1)
                                .build()
                        )
                        .type(Type.IMAGE)
                        .keyword("")
                        .licenseInfo(new LicenseInfo(License.CLUST, Rights.ALL))
                        .description("")
                        .build())
                .distribution(DistributionEntity.builder()
                        .distribution("")
                        .timeStamp("")
                        .accurualPeriodicity(AccurualPeriodicity.MONTH)
                        .spatial("")
                        .timeInfo("")
                        .build())
                .build());


    }
}
