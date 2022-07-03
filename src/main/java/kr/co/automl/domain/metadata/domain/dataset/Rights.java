package kr.co.automl.domain.metadata.domain.dataset;

import kr.co.automl.domain.metadata.domain.dataset.exceptions.CannotFindMatchRightsException;
import kr.co.automl.global.utils.EntityEnumerable;

import java.util.Arrays;
import java.util.Objects;

/**
 * 권한
 */
public enum Rights implements EntityEnumerable {
    CLUST("CLUST Consortium"),
    ALL("All");

    private final String rights;

    Rights(String rights) {
        this.rights = rights;
    }

    public static Rights ofName(String rightsName) {
        return Arrays.stream(values())
                .filter(it -> it.match(rightsName))
                .findFirst()
                .orElseThrow(() -> new CannotFindMatchRightsException(rightsName));
    }

    /**
     * 권한 이름이 일치할경우 true, 아닐경우 false를 리턴합니다.
     *
     * @param name 권한 이름
     * @return 권한 이름이 일치할경우 true, 아닐경우 false
     */
    public boolean match(String name) {
        return Objects.equals(this.rights, name);
    }

    @Override
    public String getName() {
        return this.name();
    }
}
