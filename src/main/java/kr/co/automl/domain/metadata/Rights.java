package kr.co.automl.domain.metadata;

import kr.co.automl.domain.metadata.exceptions.CannotFindMatchRightsException;

import java.util.Arrays;
import java.util.Objects;

/**
 * 권한
 */
public enum Rights {
    CLUST(Constants.CLUST_RIGHT),
    ALL(Constants.ALL_RIGHT);

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

    public boolean match(String rightsString) {
        return Objects.equals(this.rights, rightsString);
    }

    private static class Constants {
        public static final String CLUST_RIGHT = "CLUST Consortium";
        public static final String ALL_RIGHT = "All";
    }
}
