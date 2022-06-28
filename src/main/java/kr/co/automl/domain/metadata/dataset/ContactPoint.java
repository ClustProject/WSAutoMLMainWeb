package kr.co.automl.domain.metadata.dataset;

import java.util.Objects;

/**
 * 연락처
 *
 * Note: 필드 위치를 수정할 경우 테스트 코드와 연락처를 생성하는 코드도 같이 수정해야 합니다.
 */
public record ContactPoint(
        /* 이름 */
        String name,
        /* 전화번호 */
        String phoneNumber,
        /* 이메일 */
        String email
) {

    public boolean matchName(String name) {
        return Objects.equals(this.name, name);
    }
}
