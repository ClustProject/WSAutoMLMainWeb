package kr.co.automl.domain.metadata.category.exceptions;

public class CannotFindMatchCategoryException extends RuntimeException {

    public CannotFindMatchCategoryException(String name) {
        super(String.format("일치하는 카테고리를 찾을 수 없습니다: %s", name));
    }
}
