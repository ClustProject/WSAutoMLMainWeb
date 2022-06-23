package kr.co.automl.domain.metadata;

import java.util.Objects;

/**
 * 연락처
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
