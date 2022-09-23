package kr.co.automl.domain.metadata.dataset;

import kr.co.automl.domain.metadata.catalog.TestCatalogFactory;
import kr.co.automl.domain.metadata.distribution.TestDistributionFactory;
import kr.co.automl.domain.metadata.domain.catalog.Catalog;
import kr.co.automl.domain.metadata.domain.dataset.DataSet;
import kr.co.automl.domain.metadata.domain.dataset.License;
import kr.co.automl.domain.metadata.domain.dataset.LicenseInfo;
import kr.co.automl.domain.metadata.domain.dataset.Rights;
import kr.co.automl.domain.metadata.domain.dataset.Type;
import kr.co.automl.domain.metadata.domain.distribution.Distribution;

public class TestDataSetFactory {

    private TestDataSetFactory() {
    }

    public static DataSet createDefaultFixtureWith(Catalog catalog) {
        return createDefaultFixtureWith(catalog, null);
    }

    public static DataSet createDefaultFixtureWith(Distribution distribution) {
        return createDefaultFixtureWith(TestCatalogFactory.createDefaultFixture(), distribution);
    }

    public static DataSet createDefaultFixtureWith(Catalog catalog, Distribution distribution) {
        DataSet dataSet = createDefaultFixture();
        dataSet.setRelation(catalog, distribution);

        return dataSet;
    }

    public static DataSet createDefaultFixture() {
        return createDefaultFixtureWithId(null);
    }

    public static DataSet createDefaultFixtureWithId(Long id) {
        DataSet dataSet = DataSet.builder()
                .id(id)
                .title("데이터셋 이름")
                .organization(OrganizationFixtures.fixture1())
                .type(Type.IMAGE)
                .keyword("키워드1, 키워드2, 키워드1")
                .licenseInfo(new LicenseInfo(License.CLUST, Rights.ALL))
                .description("데이터셋 설명")
                .build();

        Catalog catalog = TestCatalogFactory.createDefaultFixture();
        Distribution distribution = TestDistributionFactory.createDefaultFixture();

        dataSet.setRelation(catalog, distribution);

        return dataSet;
    }
}
