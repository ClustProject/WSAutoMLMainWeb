package kr.co.automl.domain.metadata.distribution.dto;

import kr.co.automl.domain.metadata.domain.distribution.dto.CreateDistributionAttributes;

public class CreateDistributionAttributesFixtures {

    private CreateDistributionAttributesFixtures() {
    }

    public static CreateDistributionAttributes fixture1() {
        return CreateDistributionAttributes.builder()
                .title("a.csv")
                .description("설명...")
                .downloadUrl("https://download-url.com")
                .temporalResolution("시간 단위")
                .accurualPeriodicity("일")
                .spatial("공간 정보")
                .temporal("시간 정보")
                .build();
    }
}
