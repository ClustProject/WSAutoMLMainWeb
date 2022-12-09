package kr.co.automl.domain.metadata.domain.dataset;

import kr.co.automl.domain.metadata.domain.dataset.exceptions.CannotFindMatchContactNameException;
import lombok.EqualsAndHashCode;

import java.util.Set;

/**
 * 연락처 리스트.
 *
 * 해당 연락처 리스트에서 삭제만 하면 웹에 있는 드롭다운 리스트는 삭제되지 않습니다.
 * 드롭다운 목록을 삭제하려면 웹(클라이언트)에 있는 코드도 같이 수정해야 합니다.
 */
@EqualsAndHashCode
public class ContactPoints {
    private final Set<ContactPoint> contactPoints;

    public ContactPoints(ContactPoint... contactPoints) {
        this.contactPoints = Set.of(contactPoints);
    }

    public static ContactPoints ofWiseITech() {
        return new ContactPoints(
                new ContactPoint("김정연", "jykim@wise.co.kr"),
                new ContactPoint("최태동", "tdchoi@wise.co.kr")
        );
    }

    public static ContactPoints ofKeti() {
        return new ContactPoints(
                new ContactPoint("문재원", "jaewonoon@gmail.com"),
                new ContactPoint("오승택", "stoh.keti@gmail.com")
        );
    }

    public static ContactPoints ofKWeather() {
        return new ContactPoints(
                new ContactPoint("이인혜", "sakuai0720@gmail.com")
        );
    }

    public static ContactPoints ofKwangWoonUniversity() {
        return new ContactPoints(
                new ContactPoint("김대현", "swslooser@gmail.com")
        );
    }

    public static ContactPoints ofKoreaUniversity() {
        return new ContactPoints(
                new ContactPoint("이정호", "ljhz123@koreaac.kr"),
                new ContactPoint("이지윤", "jiyoonlee@koreaac.kr")
        );
    }

    public static ContactPoints ofDaliWorks() {
        return new ContactPoints(
                new ContactPoint("이순호", "soonho.lee@daliworks.net")
        );
    }

    public ContactPoint findByName(String name) {
        return this.contactPoints.stream()
                .filter(it -> it.matchName(name))
                .findFirst()
                .orElseThrow(CannotFindMatchContactNameException::new);
    }
}
