package kr.co.automl.domain.user;

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
}
