package kr.co.automl.domain.metadata.domain.dataset.exceptions;

public class CannotFindMatchContactNameException extends RuntimeException {

    public CannotFindMatchContactNameException() {
        super("연락처를 찾을 수 없습니다. 연락처 정보를 확인해주세요.");
    }
}
