package kr.co.automl.domain.metadata.dataset;

import kr.co.automl.domain.metadata.dataset.exceptions.CannotFindMatchTypeException;
import kr.co.automl.global.utils.EntityEnumerable;

import java.util.Arrays;
import java.util.Objects;

/**
 * 매체 유형
 */
public enum Type implements EntityEnumerable {
    VIDEO("비디오"),
    TEXT("텍스트"),
    NUMBER("숫자"),
    IMAGE("이미지");

    private final String name;

    Type(String name) {
        this.name = name;
    }

    public static Type ofName(String name) {
        return Arrays.stream(values())
                .filter(type -> type.matchName(name))
                .findFirst()
                .orElseThrow(() -> new CannotFindMatchTypeException(name));
    }

    private boolean matchName(String name) {
        return Objects.equals(this.name, name);
    }

    @Override
    public String getName() {
        return this.name;
    }
}
