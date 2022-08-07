package kr.co.automl.domain.user.dto;

import kr.co.automl.domain.user.Role;

public record UserResponse(
        long id,
        String name,
        String email,
        Role role
) {

    public UserResponse(long id, String name, String email, Role role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }
}
