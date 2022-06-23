package kr.co.automl.domain.metadata;

import kr.co.automl.domain.metadata.exceptions.CannotFindMatchCreatorException;

import java.util.Arrays;
import java.util.Objects;

/**
 * 생성자
 */
public enum Creator {
    WISE_I_TECH("위세아이텍", new ContactPoints(
            new ContactPoint("김정연", "01089745295", "jykim@wise.co.kr"),
            new ContactPoint("박주영", "01022983409", "jypark1@wise.co.kr"),
            new ContactPoint("최태동", "01055854925", "tdchoi@wise.co.kr")
    )),
    KETI("KETI", new ContactPoints(
            new ContactPoint("문재원", "01098827975", "jaewonoon@gmail.com"),
            new ContactPoint("오승택", "01048457047", "stoh.keti@gmail.com")
    )),
    K_WEATHER("케이웨더(주)", new ContactPoints(
            new ContactPoint("이인혜", "01085720607", "sakuai0720@gmail.com")
    )),
    KWANGWOON_UNIVERSITY("광운대", new ContactPoints(
            new ContactPoint("김대현", "01050518275", "swslooser@gmail.com")
    )),
    KOREA_UNIVERSITY("고려대", new ContactPoints(
            new ContactPoint("이정호", "01065788486", "ljhz123@koreaac.kr"),
            new ContactPoint("이지윤", "01055095963", "jiyoonlee@koreaac.kr")
    ));

    private final String name;
    private final ContactPoints contactPoints;

    Creator(String name, ContactPoints contactPoints) {
        this.name = name;
        this.contactPoints = contactPoints;
    }

    /**
     * 이름으로 찾은 생성자를 리턴합니다.
     * @param name 찾을 생성자 이름
     * @return 찾은 생성자
     *
     * @throws CannotFindMatchCreatorException 이름으로 생성자를 찾지 못한 경우
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
