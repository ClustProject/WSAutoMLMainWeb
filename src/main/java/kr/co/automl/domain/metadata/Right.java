package kr.co.automl.domain.metadata;

import kr.co.automl.domain.metadata.exceptions.CannotFindMatchRightsException;

import java.util.Arrays;
import java.util.Objects;

/**
 * 권한
 */
public enum Right {
    CLUST(Constants.CLUST_RIGHT),
    ALL(Constants.ALL_RIGHT);

    private final String right;

    Right(String right) {
        this.right = right;
    }

    public static Right ofString(String rightsString) {
        return Arrays.stream(values())
                .filter(it -> it.match(rightsString))
                .findFirst()
                .orElseThrow(CannotFindMatchRightsException::new);
    }

    public boolean match(String rightString) {
        return Objects.equals(this.right, rightString);
    }

    private static class Constants {
        public static final String CLUST_RIGHT = "CLUST Consortium";
        public static final String ALL_RIGHT = "All";
    }
}
