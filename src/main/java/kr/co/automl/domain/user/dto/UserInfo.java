package kr.co.automl.domain.user.dto;

import kr.co.automl.domain.user.Role;

public record UserInfo(
        String name,
        String imageUrl,
        Role role
) {
}
