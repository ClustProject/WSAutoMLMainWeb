package kr.co.automl.domain.metadata.domain.catalog.converter;

import kr.co.automl.domain.metadata.domain.catalog.Theme;
import kr.co.automl.global.utils.EntityEnumerableConverter;

public class ThemeConverter extends EntityEnumerableConverter<Theme> {

    public ThemeConverter() {
        super(Theme.class);
    }
}
