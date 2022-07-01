package kr.co.automl.domain.metadata.domain.dataset;

import kr.co.automl.domain.metadata.domain.dataset.dto.CreateDataSetAttributes;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class DataSetTest {
    public static final DataSet DATA_SET1 = DataSet.builder()
            .title("데이터셋 이름")
            .organization(OrganizationTest.ORGANIZATION1)
            .type(Type.IMAGE)
            .keyword("키워드1, 키워드2, 키워드1")
            .licenseInfo(new LicenseInfo(License.CLUST, Rights.ALL))
            .description("데이터셋 설명")
            .build();

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
}
