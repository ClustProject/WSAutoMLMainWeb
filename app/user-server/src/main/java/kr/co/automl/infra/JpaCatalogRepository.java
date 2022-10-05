package kr.co.automl.infra;

import kr.co.automl.domain.metadata.domain.catalog.Catalog;
import kr.co.automl.domain.metadata.domain.catalog.CatalogRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaCatalogRepository extends CatalogRepository, JpaRepository<Catalog, Long> {
}
