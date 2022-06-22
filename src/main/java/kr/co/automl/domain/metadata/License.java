package kr.co.automl.domain.metadata;

import kr.co.automl.domain.metadata.exceptions.CannotFindMatchRightsException;

import java.util.List;

/**
 * 라이센스
 */
public enum License {
    CLUST(List.of(Right.CLUST, Right.ALL)),
    PUBLIC(List.of(Right.ALL));

    private final List<Right> rights;

    License(List<Right> rights) {
        this.rights = rights;
    }

    public static License of(String licenseName, String rights) {
        License license = License.valueOf(License.class, licenseName);
        validateRightsInLicense(rights, license);

        return license;
    }

    /**
     * 권한이 라이센스 안에 있는지 검증합니다.
     * @param rightString 권한 문자열
     * @param license 라이센스
     *
     * @throws
     */
    private static void validateRightsInLicense(String rightString, License license) {
        if (!license.contains(rightString)) {
            throw new CannotFindMatchRightsException();
        }
    }

    boolean contains(String rightString) {
        return this.rights.stream()
                .anyMatch(right -> right.match(rightString));
    }
}
