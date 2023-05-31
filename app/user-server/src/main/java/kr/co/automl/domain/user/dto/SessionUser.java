package kr.co.automl.domain.user.dto;

import kr.co.automl.domain.user.Role;
import kr.co.automl.domain.user.User;

import java.io.Serializable;

public record SessionUser(
        long id,
        String name,
        String imageUrl,
        String email,
        Role role) implements Serializable {

    public static SessionUser from(User user) {
        return new SessionUser(
                user.getId(),
                user.getName(),
                user.getImageUrl(),
                user.getEmail(),
                user.getRole());
    }

    public UserInfo toUserInfo() {
        return new UserInfo(id, name, imageUrl, email, role);
    }
}
