package kr.co.automl.domain.user.exceptions;

public class CannotChangeUserRoleException extends RuntimeException {

    public CannotChangeUserRoleException() {
        super("매니저 권한으로는 변경할 수 없습니다.");
    }
}
