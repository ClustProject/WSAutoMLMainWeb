package kr.co.automl.domain.user;

import kr.co.automl.domain.user.exceptions.AlreadyAdminRoleException;
import kr.co.automl.domain.user.exceptions.CannotChangeAdminRoleException;
import kr.co.automl.domain.user.exceptions.CannotChangeUserRoleException;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Objects;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private long id;
    private String name;
    private String imageUrl;
    private String email;

    @Enumerated(value = EnumType.STRING)
    private Role role;

    @Builder
    User(long id, String name, String imageUrl, String email, Role role) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.email = email;
        this.role = role;
    }

    public static User ofDefaultRole(String name, String imageUrl, String email) {
        return User.builder()
                .name(name)
                .imageUrl(imageUrl)
                .email(email)
                .role(Role.DEFAULT)
                .build();
    }

    public boolean matchEmail(User user) {
        return user.matchEmail(this.email);
    }

    /**
     * 이메일이 일치할경우 true, 아닐경우 false를 리턴합니다.
     *
     * @param email 이메일
     *
     * @return 이메일이 일치할경우 true, 아닐경우 false
     */
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

    /**
     * 정보를 업데이트합니다.
     *
     * @param name 이름
     * @param imageUrl 이미지 URL
     * @param email 이메일
     *
     * @return 업데이트된 유저
     */
    public User update(String name, String imageUrl, String email) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.email = email;

        return this;
    }

    /**
     * 권한을 변경합니다.
     *
     * @param role 변경할 권한
     *
     * @throws CannotChangeUserRoleException 유저 권한이 주어진경우
     * @throws CannotChangeAdminRoleException 어드민 권한이 주어진경우
     * @throws AlreadyAdminRoleException 이미 어드민 권한을 가진 유저일경우
     */
    public void changeRoleTo(Role role) {
        if (role.isUser()) {
            throw new CannotChangeUserRoleException();
        }

        if (role.isAdmin()) {
            throw new CannotChangeAdminRoleException();
        }

        if (this.role.isAdmin()) {
            throw new AlreadyAdminRoleException();
        }

        this.role = role;
    }
}
