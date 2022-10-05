package kr.co.automl.domain.metadata.domain.catalog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
@AllArgsConstructor
@Builder
public class CategoryCountResponse {
    private final int atmosphericEnvironment;
    private final int farm;
    private final int factory;
    private final int vital;
    private final int lifeAndVideo;
    private final int energy;
    private final int environment;
    private final int city;
    private final int openData;

    public static CategoryCountResponse from(Map<String, Integer> map) {
        return CategoryCountResponse.builder()
                .atmosphericEnvironment(map.get("ATMOSPHERIC_ENVIRONMENT"))
                .farm(map.get("FARM"))
                .factory(map.get("FACTORY"))
                .vital(map.get("VITAL"))
                .lifeAndVideo(map.get("LIFE_AND_VIDEO"))
                .energy(map.get("ENERGY"))
                .environment(map.get("ENVIRONMENT"))
                .city(map.get("CITY"))
                .openData(map.get("OPEN_DATA"))
                .build();
    }

}
