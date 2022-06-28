package kr.co.automl.domain.metadata.catalog;

import kr.co.automl.domain.metadata.catalog.exceptions.CannotFindMatchThemeException;
import lombok.AccessLevel;
import lombok.Getter;

import java.util.Arrays;
import java.util.Objects;

/**
 * 주제
 */
@Getter(AccessLevel.PACKAGE)
public enum Theme {

    AIR_QUALITY("공기질"),
    FARM_ENVIRONMENT("농장 환경"),
    FACTORY_MOTOR("공장모터"),
    CONSTRUCTION_EQUIPMENT("건설장비"),
    WORKER("작업자"),
    VOICE("음성"),
    MOVEMENT("움직임"),
    BIOMETRIC_DATA("생체 데이터"),
    ACTIVITY_VIDEO("활동영상"),
    SOLAR("태양광"),
    OUTDOOR_STANDBY("실외대기"),
    VISITOR("방문객"),
    DOMESTIC_TRANSPORTATION("국내교통"),
    ELECTRIC_POWER("전력"),
    TRAFFIC("교통"),
    CALENDAR("캘린더");

    private final String name;

    Theme(String name) {
        this.name = name;
    }

    /**
     * 이름으로 찾은 주제를 찾아 리턴합니다.
     * @param name 찾을 주제 이름
     * @return 찾은 주제
     *
     * @throws CannotFindMatchThemeException 이름으로 주제를 찾지 못한 경우
     */
    public static Theme ofName(String name) {
        return Arrays.stream(values())
                .filter(theme -> theme.matchName(name))
                .findFirst()
                .orElseThrow(() -> new CannotFindMatchThemeException(name));
    }

    /**
     * 이름이 일치할경우 true, 아닐경우 false를 리턴합니다.
     * @param name 이름
     * @return 이름이 일치할경우 true, 아닐경우 false
     */
    boolean matchName(String name) {
        return Objects.equals(this.name, name);
    }
}
