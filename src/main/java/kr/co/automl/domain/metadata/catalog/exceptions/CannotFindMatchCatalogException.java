package kr.co.automl.domain.metadata.catalog.exceptions;

public class CannotFindMatchCatalogException extends RuntimeException {

    public CannotFindMatchCatalogException(String name) {
        super(String.format("일치하는 카탈로그를 찾을 수 없습니다: %s", name));
    }
}
