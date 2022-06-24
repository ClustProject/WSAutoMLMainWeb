package kr.co.automl.domain.metadata.exceptions;

public class CannotFindMatchCreatorException extends RuntimeException {

    public CannotFindMatchCreatorException() {
        super("생성 기관을 찾을 수 없습니다. 이름을 확인해주세요.");
    }
}
