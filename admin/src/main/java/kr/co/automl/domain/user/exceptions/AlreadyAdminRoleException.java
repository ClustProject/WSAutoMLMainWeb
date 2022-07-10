package kr.co.automl.domain.user.exceptions;

public class AlreadyAdminRoleException extends RuntimeException {

    public AlreadyAdminRoleException() {
        super("이미 어드민 권한을 가진 유저입니다.");
    }
}
