package kr.co.automl.domain.user.dto;

import kr.co.automl.domain.user.Role;

public class ChangeUserRoleRequestTest {
    public static final ChangeUserRoleRequest CHANGE_USER_ROLE_REQUEST1 = new ChangeUserRoleRequest(1L, Role.MANAGER);

    public static ChangeUserRoleRequest createWithId(long id) {
        return new ChangeUserRoleRequest(id, Role.MANAGER);
    }
}
