package kr.co.automl.domain.metadata;

import kr.co.automl.domain.metadata.exceptions.CannotFindMatchCatalogException;

import java.util.Arrays;
import java.util.Objects;

public enum Catalog {

    ATMOSPHERIC_ENVIRONMENT("대기 환경"),
    FARM("농장"),
    FACTORY("공장"),
    VITAL("생체"),
    LIFE_AND_VIDEO("생활/영상"),
    ENERGY("에너지"),
    ENVIRONMENT("환경"),
    CITY("도시"),
    OPEN_DATA("오픈데이터");

    private final String name;

    Catalog(String name) {
        this.name = name;
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

    private boolean matchName(String name) {
        return Objects.equals(this.name, name);
    }
}
