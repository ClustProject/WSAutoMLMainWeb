package kr.co.automl.domain.metadata.domain.distribution.dto;

public class CreateDistributionAttributesTest {
    public static final CreateDistributionAttributes CREATE_DISTRIBUTION_ATTRIBUTES1 = CreateDistributionAttributes.builder()
            .title("a.csv")
            .description("설명...")
            .downloadUrl("https://download-url.com")
            .temporalResolution("시간 단위")
            .accurualPeriodicity("일")
            .spatial("공간 정보")
            .temporal("시간 정보")
            .build();


}
