package kr.co.automl.domain.metadata.dataset;

import org.junit.jupiter.api.Test;

import static kr.co.automl.domain.metadata.dataset.OrganizationTest.ORGANIZATION1;
import static org.assertj.core.api.Assertions.assertThat;

public class DataSetTest {
    public static final DataSet DATA_SET1 = DataSet.create(
            "데이터셋 이름",
            "위세아이텍",
            "위세아이텍",
            "박주영",
            "이미지",
            "키워드1, 키워드2, 키워드1",
            "CLUST",
            "All",
            "데이터셋 설명"
    );

    @Test
    void create() {
        assertThat(DATA_SET1).isEqualTo(DataSet.builder()
                .title("데이터셋 이름")
                .organization(ORGANIZATION1)
                .type(Type.ofName("이미지"))
                .keyword("키워드1, 키워드2, 키워드1")
                .licenseInfo(new LicenseInfo(License.CLUST, Rights.ALL))
                .description("데이터셋 설명")
                .build()
        );
    }
}
