package kr.co.automl.domain.metadata.domain.dataset.converter;

import kr.co.automl.domain.metadata.domain.dataset.License;
import kr.co.automl.global.utils.EntityEnumerableConverter;

public class LicenseConverter extends EntityEnumerableConverter<License> {

    public LicenseConverter() {
        super(License.class);
    }
}
