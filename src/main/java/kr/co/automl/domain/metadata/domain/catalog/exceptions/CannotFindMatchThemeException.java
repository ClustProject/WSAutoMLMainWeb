package kr.co.automl.domain.metadata.domain.catalog.exceptions;

public class CannotFindMatchThemeException extends RuntimeException {

    public CannotFindMatchThemeException(String name) {
        super(String.format("일치하는 주제를 찾을 수 없습니다: %s", name));
    }
}
