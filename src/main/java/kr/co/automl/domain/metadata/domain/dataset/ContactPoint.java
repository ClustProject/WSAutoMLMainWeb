package kr.co.automl.domain.metadata.domain.dataset;

import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import java.util.Objects;

import static lombok.AccessLevel.PROTECTED;

/**
 * 연락처
 *
 * Note: 필드 위치를 수정할 경우 테스트 코드와 연락처를 생성하는 코드도 같이 수정해야 합니다.
 */
@Embeddable
@NoArgsConstructor(access = PROTECTED)
@EqualsAndHashCode
public class ContactPoint {
    /* 이름 */
    private String name;
    /* 이메일 */
    private String email;

    public ContactPoint(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public boolean matchName(String name) {
        return Objects.equals(this.name, name);
    }
}
