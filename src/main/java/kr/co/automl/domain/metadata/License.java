package kr.co.automl.domain.metadata;

import kr.co.automl.domain.metadata.exceptions.CannotFindMatchRightsException;

import java.util.List;

/**
 * 라이센스
 */
public enum License {
    CLUST(List.of(Rights.CLUST, Rights.ALL)),
    PUBLIC(List.of(Rights.ALL));

    private final List<Rights> rights;

    License(List<Rights> rights) {
        this.rights = rights;
    }

    public static License of(String licenseName, String rightsString) {
        License license = License.valueOf(License.class, licenseName);
        validateRightsInLicense(rightsString, license);

        return license;
    }

    /**
     * 권한이 라이센스 안에 있는지 검증합니다.
     * @param rightString 권한 문자열
     * @param license 라이센스
     *
     * @throws CannotFindMatchRightsException 일치하는 권한을 찾지 못할 경우
     */
    private static void validateRightsInLicense(String rightString, License license) {
        if (!license.contains(rightString)) {
            throw new CannotFindMatchRightsException();
        }
    }

    boolean contains(String rightString) {
        return this.rights.stream()
                .anyMatch(rights -> rights.match(rightString));
    }
}
