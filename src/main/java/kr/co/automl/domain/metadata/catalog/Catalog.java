package kr.co.automl.domain.metadata.catalog;

import kr.co.automl.domain.metadata.exceptions.CannotFindMatchCatalogException;
import kr.co.automl.domain.metadata.exceptions.CannotFindMatchThemeException;

import java.util.Arrays;
import java.util.Objects;
import java.util.Set;

public enum Catalog {

    ATMOSPHERIC_ENVIRONMENT("대기 환경", Set.of(
            Theme.AIR_QUALITY
    )),
    FARM("농장", Set.of(
            Theme.FARM_ENVIRONMENT
    )),
    FACTORY("공장", Set.of(
            Theme.FACTORY_MOTOR,
            Theme.CONSTRUCTION_EQUIPMENT
    )),
    VITAL("생체", Set.of(
            Theme.WORKER,
            Theme.VOICE,
            Theme.MOVEMENT,
            Theme.BIOMETRIC_DATA
    )),
    LIFE_AND_VIDEO("생활/영상", Set.of(
            Theme.ACTIVITY_VIDEO
    )),
    ENERGY("에너지", Set.of(
            Theme.SOLAR,
            Theme.ELECTRIC_POWER
    )),
    ENVIRONMENT("환경", Set.of(
            Theme.OUTDOOR_STANDBY
    )),
    CITY("도시", Set.of(
            Theme.VISITOR
    )),
    OPEN_DATA("오픈데이터", Set.of(
            Theme.TRAFFIC,
            Theme.CALENDAR
    ));

    private final String name;
    private final Set<Theme> themes;

    Catalog(String name, Set<Theme> themes) {
        this.name = name;
        this.themes = themes;
    }

    /**
     * 카탈로그 이름으로 일치하는 카탈로그를 찾아 리턴합니다.
     * @param name 찾을 카탈로그 이름
     * @return 찾은 카탈로그
     *
     * @throws CannotFindMatchCatalogException 이름으로 카탈로그를 찾지 못한 경우
     */
    public static Catalog ofName(String name) {
        return Arrays.stream(values())
                .filter(catalog -> catalog.matchName(name))
                .findFirst()
                .orElseThrow(() -> new CannotFindMatchCatalogException(name));
    }

    /**
     * 주제 이름을 찾아 리턴합니다.
     *
     * @param name 찾을 주제 이름
     * @return 찾은 주제
     *
     * @throws CannotFindMatchThemeException 주제 이름으로 일치하는 주제를 찾지 못한 경우
     */
    public Theme findThemeByName(String name) {
        return this.themes.stream()
                .filter(theme -> theme.matchName(name))
                .findFirst()
                .orElseThrow(() -> new CannotFindMatchThemeException(name));
    }

    private boolean matchName(String name) {
        return Objects.equals(this.name, name);
    }
}
