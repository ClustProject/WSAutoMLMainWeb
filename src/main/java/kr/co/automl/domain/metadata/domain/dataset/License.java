package kr.co.automl.domain.metadata.domain.dataset;

import kr.co.automl.domain.metadata.domain.dataset.exceptions.CannotFindMatchRightsException;
import kr.co.automl.global.utils.EntityEnumerable;

import java.util.Set;

/**
 * 라이센스
 */
public enum License implements EntityEnumerable {
    CLUST(Rights.CLUST, Rights.ALL),
    PUBLIC(Rights.ALL);

    private final Set<Rights> rightses;

    License(Rights... rights) {
        this.rightses = Set.of(rights);
    }

    public static License of(String licenseName, String rightsString) {
        License license = valueOf(licenseName);
        validateRightsInLicense(rightsString, license);

        return license;
    }

    /**
     * 권한이 라이센스 안에 있는지 검증합니다.
     * @param rightsName 권한 이름
     * @param license 라이센스
     *
     * @throws CannotFindMatchRightsException 일치하는 권한을 찾지 못할 경우
     */
    private static void validateRightsInLicense(String rightsName, License license) {
        if (!license.contains(rightsName)) {
            throw new CannotFindMatchRightsException();
        }
    }

    boolean contains(String rightString) {
        return this.rightses.stream()
                .anyMatch(rights -> rights.match(rightString));
    }

    /**
     * 권한 이름으로 찾은 권한을 리턴합니다.
     * @param rightsName 찾을 권한 이름
     * @return 찾은 권한
     */
    public Rights findRightsByName(String rightsName) {
        return this.rightses.stream()
                .filter(rights -> rights.match(rightsName))
                .findFirst()
                .orElseThrow(CannotFindMatchRightsException::new);
    }

    @Override
    public String getName() {
        return this.name();
    }
}
