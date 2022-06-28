package kr.co.automl.domain.metadata.dataset;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class DataSetTest {

    @Test
    void create() {
        DataSet dataSet = DataSet.create(
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

        assertThat(dataSet).isEqualTo(
                new DataSet(
                        "데이터셋 이름",
                        Organization.of("위세아이텍",
                                "위세아이텍",
                                "박주영"),
                        Type.ofName("이미지"),
                        "키워드1, 키워드2, 키워드1",
                        LicenseInfo.of("CLUST",
                                "All"),
                        "데이터셋 설명"
                )
        );
    }
}
