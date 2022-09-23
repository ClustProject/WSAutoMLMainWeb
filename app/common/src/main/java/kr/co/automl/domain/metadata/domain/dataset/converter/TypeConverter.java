package kr.co.automl.domain.metadata.domain.dataset.converter;

import kr.co.automl.domain.metadata.domain.dataset.Type;
import kr.co.automl.global.utils.EntityEnumerableConverter;

public class TypeConverter extends EntityEnumerableConverter<Type> {

    public TypeConverter() {
        super(Type.class);
    }
}
