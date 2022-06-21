package kr.co.automl.domain.user;

import kr.co.automl.domain.user.dto.SessionUser;
import kr.co.automl.domain.user.dto.UserInfo;
import kr.co.automl.global.config.dto.OAuthAttributes;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Objects;

@EqualsAndHashCode
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;
    private String name;
    private String imageUrl;
    private String email;

    @Enumerated(value = EnumType.STRING)
    private Role role;

    @Builder
    User(String name, String imageUrl, String email, Role role) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.email = email;
        this.role = role;
    }

    public static User of(OAuthAttributes oAuthAttributes) {
        return ofDefaultRole(
                oAuthAttributes.name(),
                oAuthAttributes.imageUrl(),
                oAuthAttributes.email()
        );
    }

    static User ofDefaultRole(String name, String imageUrl, String email) {
        return User.builder()
                .name(name)
                .imageUrl(imageUrl)
                .email(email)
                .role(Role.DEFAULT)
                .build();
    }

    public SessionUser toSessionUser() {
        return new SessionUser(name, imageUrl, email, role);
    }

    public boolean matchEmail(User user) {
        return user.matchEmail(this.email);
    }

    public boolean matchEmail(String email) {
        return Objects.equals(this.email, email);
    }

    /**
     * 권한 이름을 리턴합니다.
     *
     * @return 권한 이름
     */
    public String getRoleName() {
        return this.role.getName();
    }

    public User update(OAuthAttributes oAuthAttributes) {
        this.name = oAuthAttributes.name();
        this.imageUrl = oAuthAttributes.imageUrl();
        this.email = oAuthAttributes.email();

        return this;
    }

    public UserInfo toUserInfo() {
        return new UserInfo(name, imageUrl, role);
    }
}
