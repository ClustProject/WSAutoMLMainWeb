package kr.co.automl.domain.metadata.dataset.exceptions;

public class CannotFindMatchTypeException extends RuntimeException {

    public CannotFindMatchTypeException(String name) {
        super(String.format("일치하는 매체 유형을 찾을 수 없습니다: %s", name));
    }
}
