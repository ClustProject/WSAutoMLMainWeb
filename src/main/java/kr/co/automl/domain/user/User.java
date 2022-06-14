package kr.co.automl.domain.user;

public class User {
    private final Long id;
    private final String name;
    private final String imageUrl;
    private final String email;
    private final Role role;

    public User(Long id, String name, String imageUrl, String email, Role role) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.email = email;
        this.role = role;
    }
}
