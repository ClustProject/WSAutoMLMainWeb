package kr.co.automl.domain.metadata.dataset;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class DataSetEntityTest {

    @Test
    void create() {
        DataSetEntity dataSet = DataSetEntity.create(
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

        assertThat(dataSet).isEqualTo(DataSetEntity.builder()
                .title("데이터셋 이름")
                .organization(Organization.of("위세아이텍",
                        "위세아이텍",
                        "박주영"))
                .type(Type.ofName("이미지"))
                .keyword("키워드1, 키워드2, 키워드1")
                .licenseInfo(LicenseInfo.of("CLUST", "All"))
                .description("데이터셋 설명")
                .build()
        );
    }
}
