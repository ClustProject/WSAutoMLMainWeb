package kr.co.automl.domain.user.exceptions;

public class CannotFindUserException extends RuntimeException {

    public CannotFindUserException(long userId) {
        super(String.format("유저를 찾을 수 없습니다: %s", userId));
    }
}
