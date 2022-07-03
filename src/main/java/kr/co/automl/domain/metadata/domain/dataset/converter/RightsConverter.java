package kr.co.automl.domain.metadata.domain.dataset.converter;

import kr.co.automl.domain.metadata.domain.dataset.Rights;
import kr.co.automl.global.utils.EntityEnumerableConverter;

public class RightsConverter extends EntityEnumerableConverter<Rights> {

    public RightsConverter() {
        super(Rights.class);
    }
}
