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

    /**
     * 권한 이름으로 찾은 권한을 리턴합니다.
     * @param rightsName 찾을 권한 이름
     * @return 찾은 권한
     */
    public Rights findRightsByName(String rightsName) {
        return this.rightses.stream()
                .filter(rights -> rights.match(rightsName))
                .findFirst()
                .orElseThrow(() -> new CannotFindMatchRightsException(rightsName));
    }

    @Override
    public String getName() {
        return this.name();
    }
}
