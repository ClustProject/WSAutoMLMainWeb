package kr.co.automl.domain.metadata.domain.catalog.converter;

import kr.co.automl.domain.metadata.domain.catalog.Category;
import kr.co.automl.global.utils.EntityEnumerableConverter;

public class CategoryConverter extends EntityEnumerableConverter<Category> {

    public CategoryConverter() {
        super(Category.class);
    }
}
