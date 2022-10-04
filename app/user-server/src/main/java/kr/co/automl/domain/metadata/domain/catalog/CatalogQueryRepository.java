package kr.co.automl.domain.metadata.domain.catalog;

import com.querydsl.core.Tuple;

import java.util.List;

public interface CatalogQueryRepository {

    List<Tuple> countGroupByCategory();
}
