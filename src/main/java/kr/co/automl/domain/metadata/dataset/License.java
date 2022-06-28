package kr.co.automl.domain.metadata.dataset;

import kr.co.automl.domain.metadata.exceptions.CannotFindMatchRightsException;

import java.util.Arrays;
import java.util.List;

/**
 * 라이센스
 */
public enum License {
    CLUST(Rights.CLUST, Rights.ALL),
    PUBLIC(Rights.ALL);

    private final List<Rights> rightsList;

    License(Rights... rights) {
        this.rightsList = Arrays.asList(rights);
    }

    public static License of(String licenseName, String rightsString) {
        License license = valueOf(licenseName);
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
        return this.rightsList.stream()
                .anyMatch(rights -> rights.match(rightString));
    }
}
