package kr.co.automl.domain.metadata;

import kr.co.automl.domain.metadata.exceptions.CannotFindMatchThemeException;
import lombok.AccessLevel;
import lombok.Getter;

import java.util.Arrays;
import java.util.Objects;

/**
 * 주제
 */
@Getter(AccessLevel.PACKAGE)
public enum Theme {

    FARM_SITUATION("농장 상황"),
    FACTORY_MOTOR("공장모터"),
    CONSTRUCTION_EQUIPMENT("건설장비"),
    OPERATOR_BODY_TEMPERATURE("작업자 체온"),
    VOICE("음성"),
    MOVEMENT("움직임"),
    PULSE_WAVE("맥파"),
    ACTIVITY_VIDEO("활동영상"),
    SOLAR("태양광"),
    OUTDOOR_STANDBY("실외대기"),
    VISITOR("방문객"),
    DOMESTIC_TRANSPORTATION("국내교통");

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
    private boolean matchName(String name) {
        return Objects.equals(this.name, name);
    }
}
