package kr.co.automl.domain.user.dto;

import kr.co.automl.domain.user.Role;

import java.io.Serializable;

public record SessionUser(
        String name,
        String imageUrl,
        String email,
        Role role
) implements Serializable {

    public UserInfo toUserInfo() {
        return new UserInfo(name, imageUrl, role);
    }
}
