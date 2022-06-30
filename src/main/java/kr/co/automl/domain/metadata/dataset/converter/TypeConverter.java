package kr.co.automl.domain.metadata.dataset.converter;

import kr.co.automl.domain.metadata.dataset.Type;
import kr.co.automl.global.utils.EntityEnumerableConverter;

public class TypeConverter extends EntityEnumerableConverter<Type> {

    public TypeConverter() {
        super(Type.class);
    }
}
