package kr.co.automl.domain.metadata;

/**
 * 매체 유형
 */
public enum Type {
    VIDEO("비디오"),
    TEXT("텍스트"),
    NUMBER("숫자"),
    IMAGE("이미지");

    private final String name;

    Type(String name) {
        this.name = name;
    }
}
