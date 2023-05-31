package kr.co.automl.domain.user.dto;

import kr.co.automl.domain.user.Role;
import kr.co.automl.domain.user.User;
import lombok.Builder;

public record UserResponse(
        long id,
        String name,
        String imageUrl,
        String email,
        Role role) {

    public static UserResponse from(User user) {
        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getImageUrl(),
                user.getEmail(),
                user.getRole());
    }

    @Builder
    public UserResponse(long id, String name, String imageUrl, String email, Role role) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.email = email;
        this.role = role;
    }
}
