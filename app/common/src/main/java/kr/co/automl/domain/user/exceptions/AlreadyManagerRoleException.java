package kr.co.automl.domain.user.exceptions;

public class AlreadyManagerRoleException extends RuntimeException {

    public AlreadyManagerRoleException() {
        super("이미 매니저 권한을 가진 유저입니다.");
    }
}
