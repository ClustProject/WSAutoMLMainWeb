package kr.co.automl.domain.metadata.dataset;

import kr.co.automl.domain.metadata.exceptions.CannotFindMatchRightsException;

import java.util.Arrays;
import java.util.Objects;

/**
 * 권한
 */
public enum Rights {
    CLUST("CLUST Consortium"),
    ALL("All");

    private final String rights;

    Rights(String rights) {
        this.rights = rights;
    }

    public static Rights ofString(String rightsString) {
        return Arrays.stream(values())
                .filter(it -> it.match(rightsString))
                .findFirst()
                .orElseThrow(CannotFindMatchRightsException::new);
    }

    /**
     * 권한 이름이 일치할경우 true, 아닐경우 false를 리턴합니다.
     *
     * @param rightsString 권한 이름
     * @return 권한 이름이 일치할경우 true, 아닐경우 false
     */
    public boolean match(String rightsString) {
        return Objects.equals(this.rights, rightsString);
    }
}
