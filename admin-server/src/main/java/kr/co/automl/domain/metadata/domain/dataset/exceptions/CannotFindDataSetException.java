package kr.co.automl.domain.metadata.domain.dataset.exceptions;

public class CannotFindDataSetException extends RuntimeException {
    public CannotFindDataSetException(long id) {
        super(String.format("식별자 %s에 대한 데이터셋을 찾을 수 없습니다.", id));
    }
}
