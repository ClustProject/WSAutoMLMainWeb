package kr.co.automl.domain.metadata.domain.dataset;

import kr.co.automl.domain.metadata.domain.catalog.Catalog;
import kr.co.automl.domain.metadata.domain.dataset.dto.CreateDataSetAttributes;
import kr.co.automl.domain.metadata.domain.dataset.dto.DataSetResponse;
import kr.co.automl.domain.metadata.domain.distribution.Distribution;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class DataSetTest {
    public static DataSet createFixtureWith(Catalog catalog, Distribution distribution) {
        DataSet dataSet = createFixture();
        dataSet.setRelation(catalog, distribution);

        return dataSet;
    }

    public static DataSet createFixture() {
        return DataSet.builder()
                .title("데이터셋 이름")
                .organization(OrganizationTest.ORGANIZATION1)
                .type(Type.IMAGE)
                .keyword("키워드1, 키워드2, 키워드1")
                .licenseInfo(new LicenseInfo(License.CLUST, Rights.ALL))
                .description("데이터셋 설명")
                .build();
    }

    @Test
    void from_생성_테스트() {
        CreateDataSetAttributes createDataSetAttributes = CreateDataSetAttributes.builder()
                .title("데이터셋 이름")
                .publisher("위세아이텍")
                .creator("위세아이텍")
                .contactPointName("박주영")
                .type("이미지")
                .keyword("키워드1, 키워드2, 키워드1")
                .license("CLUST")
                .rights("All")
                .description("데이터셋 설명")
                .build();

        DataSet dataSet = DataSet.from(createDataSetAttributes);

        assertThat(dataSet.getTitle()).isEqualTo("데이터셋 이름");
        assertThat(dataSet.getOrganization()).isEqualTo(OrganizationTest.ORGANIZATION1);
        assertThat(dataSet.getType()).isEqualTo(Type.IMAGE);
        assertThat(dataSet.getKeyword()).isEqualTo("키워드1, 키워드2, 키워드1");
        assertThat(dataSet.getLicenseInfo()).isEqualTo(new LicenseInfo(License.CLUST, Rights.ALL));
        assertThat(dataSet.getDescription()).isEqualTo("데이터셋 설명");
    }

    @Nested
    class setRelation_메서드는 {

        @Test
        void 연관관계를_설정한다() {
            DataSet dataSet = DataSet.builder().build();
            Catalog catalog = Catalog.builder().build();
            Distribution distribution = Distribution.builder().build();

            dataSet.setRelation(catalog, distribution);

            assertThat(dataSet.getCatalog()).isEqualTo(catalog);
            assertThat(dataSet.getDistribution()).isEqualTo(distribution);
            assertThat(catalog.getDataSet()).isEqualTo(dataSet);
        }
    }

    @Nested
    class toResponse_메서드는 {

        @Test
        void 변환된_응답객체를_리턴한다() {
            DataSet dataSet = DataSet.builder()
                    .title("데이터셋 이름")
                    .organization(OrganizationTest.ORGANIZATION1)
                    .type(Type.IMAGE)
                    .keyword("키워드1, 키워드2, 키워드1")
                    .licenseInfo(new LicenseInfo(License.CLUST, Rights.ALL))
                    .description("데이터셋 설명")
                    .build();

            DataSetResponse dataSetResponse = dataSet.toResponse();

            assertThat(dataSetResponse).isEqualTo(DataSetResponse.builder()
                    .title("데이터셋 이름")
                    .organization(OrganizationTest.ORGANIZATION1)
                    .type("이미지")
                    .keyword("키워드1, 키워드2, 키워드1")
                    .licenseInfo(new LicenseInfo(License.CLUST, Rights.ALL))
                    .description("데이터셋 설명")
                    .build());
        }
    }
}
