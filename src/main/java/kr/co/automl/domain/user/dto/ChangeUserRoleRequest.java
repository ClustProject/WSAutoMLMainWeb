package kr.co.automl.domain.user.dto;

import kr.co.automl.domain.user.Role;

public record ChangeUserRoleRequest(
        Role role
) {
}
