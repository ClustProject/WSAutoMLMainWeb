package kr.co.automl.domain.metadata;

import kr.co.automl.domain.metadata.exceptions.CannotFindMatchThemeTaxonomyException;
import lombok.AccessLevel;
import lombok.Getter;

import java.util.Arrays;
import java.util.Objects;

/**
 * 주제 분류
 */
@Getter(AccessLevel.PACKAGE)
public enum ThemeTaxonomy {

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

    ThemeTaxonomy(String name) {
        this.name = name;
    }

    public static ThemeTaxonomy of(String name) {
        return Arrays.stream(values())
                .filter(it -> it.matchName(name))
                .findFirst()
                .orElseThrow(CannotFindMatchThemeTaxonomyException::new);
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
