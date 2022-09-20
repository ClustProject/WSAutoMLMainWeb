package kr.co.automl.domain.user.exceptions;

public class CannotChangeAdminRoleException extends RuntimeException {

    public CannotChangeAdminRoleException() {
        super("어드민 권한으로는 변경할 수 없습니다.");
    }
}
