package kr.co.automl.domain.user;

import static kr.co.automl.domain.user.User.ofDefaultRole;

public class TestUserFactory {

    private TestUserFactory() {
    }

    public static User create(String name, String imageUrl, String email) {
        return ofDefaultRole(name, imageUrl, email);
    }

    public static User createWithEmail(String email) {
        return User.builder()
                .email(email)
                .build();
    }

    public static User create() {
        return create("name", "imageUrl", "email");
    }

    public static User createWithId(long id) {
        return User.builder()
                .id(id)
                .role(Role.USER)
                .build();
    }

}
