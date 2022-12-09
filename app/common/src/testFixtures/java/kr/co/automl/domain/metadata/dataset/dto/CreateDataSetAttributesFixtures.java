package kr.co.automl.domain.metadata.dataset.dto;

import kr.co.automl.domain.metadata.domain.dataset.dto.CreateDataSetAttributes;

public class CreateDataSetAttributesFixtures {

    private CreateDataSetAttributesFixtures() {
    }

    public static CreateDataSetAttributes fixture1() {
        return CreateDataSetAttributes.builder()
                .title("제목")
                .publisher("한국도로공사")
                .creator("위세아이텍")
                .contactPointName("김정연")
                .type("이미지")
                .keyword("키워드1, 키워드2")
                .license("PUBLIC")
                .rights("All")
                .description("설명...")
                .build();
    }
}
