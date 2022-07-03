package kr.co.automl.domain.metadata.domain.dataset.exceptions;

public class CannotFindMatchRightsException extends RuntimeException {

    public CannotFindMatchRightsException(String rightsName) {
        super(String.format("일치하는 권한이 없습니다: %s", rightsName));
    }
}
