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

    public static Right ofString(String rightString) {
        return Arrays.stream(values())
                .filter(it -> it.match(rightString))
                .findFirst()
                .orElseThrow(CannotFindMatchRightsException::new);
    }

    public boolean match(String rightString) {
        return Objects.equals(this.right, rightString);
    }

    private static class Constants {
        public static final String CLUST_RIGHT = "This data is © CLUST Consortium 2021. Its duplication is restricted to the personal use within the Consortium, funding agency and project reviewers";
        public static final String ALL_RIGHT = "All";
    }
}
