package kr.co.automl.domain.user.exceptions;

public class AlreadyUserRoleException extends RuntimeException {

    public AlreadyUserRoleException() {
        super("이미 유저 권한을 가진 유저입니다.");
    }
}
