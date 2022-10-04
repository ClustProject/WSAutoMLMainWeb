package kr.co.automl.domain.metadata.domain.catalog.dto;

import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

class CategoryCountResponseTest {

    @Test
    void from메서드는_생성된_객체를_리턴한다() {
        Map<String, Integer> map = new HashMap<>();
        initDataTo(map);

        CategoryCountResponse response = CategoryCountResponse.from(map);

        assertThat(response.getAtmosphericEnvironment()).isEqualTo(1);
        assertThat(response.getFarm()).isEqualTo(1);
        assertThat(response.getFactory()).isEqualTo(1);
        assertThat(response.getVital()).isEqualTo(1);
        assertThat(response.getLifeAndVideo()).isEqualTo(1);
        assertThat(response.getEnergy()).isEqualTo(1);
        assertThat(response.getEnvironment()).isEqualTo(1);
        assertThat(response.getCity()).isEqualTo(1);
        assertThat(response.getOpenData()).isEqualTo(1);
    }

    private void initDataTo(Map<String, Integer> map) {
        map.put("ATMOSPHERIC_ENVIRONMENT", 1);
        map.put("FARM", 1);
        map.put("FACTORY", 1);
        map.put("VITAL", 1);
        map.put("LIFE_AND_VIDEO", 1);
        map.put("ENERGY", 1);
        map.put("ENVIRONMENT", 1);
        map.put("CITY", 1);
        map.put("OPEN_DATA", 1);
    }
}
