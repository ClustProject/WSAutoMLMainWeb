package kr.co.automl.domain.metadata.catalog.converter;

import kr.co.automl.domain.metadata.catalog.Category;
import kr.co.automl.global.utils.EntityEnumerableConverter;

public class CatagoryConverter extends EntityEnumerableConverter<Category> {

    public CatagoryConverter() {
        super(Category.class);
    }
}
