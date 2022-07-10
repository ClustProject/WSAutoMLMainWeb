package kr.co.automl.domain.user;

import com.fasterxml.jackson.annotation.JsonCreator;

import java.util.Objects;

public enum Role {
    USER, MANAGER, ADMIN;

    public static final Role DEFAULT = USER;

    private static final String SPRING_SECURITY_ROLE_NAME_PREFIX = "ROLE_";

    /**
     * 권한 이름을 리턴합니다.
     * <p>
     * Note: 스프링 시큐리티에서는 권한 이름 접두어를 포함해야 합니다.
     *
     * @return 권한 이름
     */
    public String getName() {
        return SPRING_SECURITY_ROLE_NAME_PREFIX + this;
    }

    public boolean isAdmin() {
        return this == ADMIN;
    }

    @JsonCreator
    public static Role getNameByValue(String value) {
        for (Role role : Role.values()) {
            if (Objects.equals(role.toString(), value)) {
                return role;
            }
        }

        return null;
    }

}
