package kr.co.automl.domain.metadata;

import kr.co.automl.domain.metadata.exceptions.CannotFindMatchCreatorException;

import java.util.Arrays;
import java.util.Objects;

/**
 * 생성 기관
 */
public enum Creator {
    WISE_I_TECH("위세아이텍", ContactPoints.ofWiseITech()),
    KETI("KETI", ContactPoints.ofKeti()),
    K_WEATHER("케이웨더(주)", ContactPoints.ofKWeather()),
    KWANGWOON_UNIVERSITY("광운대", ContactPoints.ofKwangWoonUniversity()),
    KOREA_UNIVERSITY("고려대", ContactPoints.ofKoreaUniversity());

    private final String name;
    private final ContactPoints contactPoints;

    Creator(String name, ContactPoints contactPoints) {
        this.name = name;
        this.contactPoints = contactPoints;
    }

    /**
     * 이름으로 찾은 생성 기관을 리턴합니다.
     * @param name 찾을 생성 기관 이름
     * @return 찾은 생성 기관
     *
     * @throws CannotFindMatchCreatorException 이름으로 생성 기관을 찾지 못한 경우
     */
    public static Creator ofName(String name) {
        return Arrays.stream(values())
                .filter(creator -> Objects.equals(creator.name, name))
                .findFirst()
                .orElseThrow(CannotFindMatchCreatorException::new);
    }

    /**
     * 연락처 이름을 통해 찾은 연락처를 리턴합니다.
     * @param contactPointName 연락처 이름
     * @return 찾은 연락처
     */
    public ContactPoint findContactBy(String contactPointName) {
        return this.contactPoints.findByName(contactPointName);
    }
}
