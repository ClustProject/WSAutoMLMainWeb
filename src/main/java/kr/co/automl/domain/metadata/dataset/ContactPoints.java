package kr.co.automl.domain.metadata.dataset;

import kr.co.automl.domain.metadata.exceptions.CannotFindMatchContactNameException;
import lombok.EqualsAndHashCode;

import java.util.Arrays;
import java.util.List;

@EqualsAndHashCode
public class ContactPoints {
    private final List<ContactPoint> contactPoints;

    public ContactPoints(ContactPoint... contactPoints) {
        this.contactPoints = Arrays.asList(contactPoints);
    }

    public static ContactPoints ofWiseITech() {
        return new ContactPoints(
                new ContactPoint("김정연", "01089745295", "jykim@wise.co.kr"),
                new ContactPoint("박주영", "01022983409", "jypark1@wise.co.kr"),
                new ContactPoint("최태동", "01055854925", "tdchoi@wise.co.kr")
        );
    }

    public static ContactPoints ofKeti() {
        return new ContactPoints(
                new ContactPoint("문재원", "01098827975", "jaewonoon@gmail.com"),
                new ContactPoint("오승택", "01048457047", "stoh.keti@gmail.com")
        );
    }

    public static ContactPoints ofKWeather() {
        return new ContactPoints(
                new ContactPoint("이인혜", "01085720607", "sakuai0720@gmail.com")
        );
    }

    public static ContactPoints ofKwangWoonUniversity() {
        return new ContactPoints(
                new ContactPoint("김대현", "01050518275", "swslooser@gmail.com")
        );
    }

    public static ContactPoints ofKoreaUniversity() {
        return new ContactPoints(
                new ContactPoint("이정호", "01065788486", "ljhz123@koreaac.kr"),
                new ContactPoint("이지윤", "01055095963", "jiyoonlee@koreaac.kr")
        );
    }

    public static ContactPoints ofDaliWorks() {
        return new ContactPoints(
                new ContactPoint("이순호", "01044230033", "soonho.lee@daliworks.net")
        );
    }

    public ContactPoint findByName(String name) {
        return this.contactPoints.stream()
                .filter(it -> it.matchName(name))
                .findFirst()
                .orElseThrow(CannotFindMatchContactNameException::new);
    }
}
