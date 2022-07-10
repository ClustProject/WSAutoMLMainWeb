package kr.co.automl.domain.metadata.domain.dataset.dto;

public class CreateDataSetAttributesTest {
    public static final CreateDataSetAttributes CREATE_DATASET_ATTRIBUTES1 = CreateDataSetAttributes.builder()
            .title("제목")
            .publisher("한국도로공사")
            .creator("위세아이텍")
            .contactPointName("박주영")
            .type("이미지")
            .keyword("키워드1, 키워드2")
            .license("PUBLIC")
            .rights("All")
            .description("설명...")
            .build();


}
