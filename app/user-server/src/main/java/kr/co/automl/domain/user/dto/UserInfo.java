package kr.co.automl.domain.user.dto;

import kr.co.automl.domain.user.Role;

public record UserInfo(
        long id,
        String name,
        String imageUrl,
        String email,
        Role role) {
}
