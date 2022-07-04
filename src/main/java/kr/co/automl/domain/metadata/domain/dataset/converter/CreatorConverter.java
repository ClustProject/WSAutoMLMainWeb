package kr.co.automl.domain.metadata.domain.dataset.converter;

import kr.co.automl.domain.metadata.domain.dataset.Creator;
import kr.co.automl.global.utils.EntityEnumerableConverter;

public class CreatorConverter extends EntityEnumerableConverter<Creator> {

    public CreatorConverter() {
        super(Creator.class);
    }
}
