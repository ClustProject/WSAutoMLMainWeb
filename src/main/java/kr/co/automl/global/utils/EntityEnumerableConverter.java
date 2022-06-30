package kr.co.automl.global.utils;

import com.nimbusds.oauth2.sdk.util.StringUtils;

import javax.persistence.AttributeConverter;
import java.util.Objects;

public abstract class EntityEnumerableConverter<T extends EntityEnumerable>
        implements AttributeConverter<T, String> {

    private final Class<T> clazz;

    public EntityEnumerableConverter(Class<T> clazz) {
        this.clazz = clazz;
    }

    /**
     * 엔터티 속성에 저장된 값을 데이터베이스에 저장할 컬럼으로 변환합니다.
     *
     * @param attribute 변환할 엔터티 속성 값
     * @return 데이터베이스에 저장할 컬럼
     */
    @Override
    public String convertToDatabaseColumn(T attribute) {
        if (Objects.isNull(attribute)) {
            return null;
        }

        return attribute.getName();
    }

    /**
     * 데이터베이스 열에 저장된 데이터를 엔터티 속성에 저장할 값으로 변환합니다.
     *
     * @param dbColumn DB 컬럼 값
     * @return 엔티티 속성에 저장할 값
     */
    @Override
    public T convertToEntityAttribute(String dbColumn) {
        if (StringUtils.isBlank(dbColumn)) {
            return null;
        }

        T[] enumConstants = clazz.getEnumConstants();
        for (T enumConstant : enumConstants) {
            if (Objects.equals(enumConstant.getName(), dbColumn)) {
                return enumConstant;
            }
        }

        throw new UnsupportedOperationException("지원하지 않는 enum 형식입니다.");
    }
}
