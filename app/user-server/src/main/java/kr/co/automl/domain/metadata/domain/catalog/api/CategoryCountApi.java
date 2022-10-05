package kr.co.automl.domain.metadata.domain.catalog.api;

import kr.co.automl.domain.metadata.domain.catalog.dto.CategoryCountResponse;
import kr.co.automl.domain.metadata.domain.catalog.service.CatalogQuery;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CategoryCountApi {

    private final CatalogQuery catalogQuery;

    public CategoryCountApi(CatalogQuery catalogQuery) {
        this.catalogQuery = catalogQuery;
    }

    @GetMapping("/category/count")
    public CategoryCountResponse getCategoryCount() {
        return catalogQuery.getCategoryCount();
    }
}
