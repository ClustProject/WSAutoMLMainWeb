package kr.co.automl.domain.metadata.service;

import kr.co.automl.domain.metadata.domain.catalog.Catalog;
import kr.co.automl.domain.metadata.domain.catalog.Category;
import kr.co.automl.domain.metadata.domain.catalog.Theme;
import kr.co.automl.domain.metadata.domain.dataset.ContactPoint;
import kr.co.automl.domain.metadata.domain.dataset.Creator;
import kr.co.automl.domain.metadata.domain.dataset.DataSet;
import kr.co.automl.domain.metadata.domain.dataset.DataSetRepository;
import kr.co.automl.domain.metadata.domain.dataset.License;
import kr.co.automl.domain.metadata.domain.dataset.LicenseInfo;
import kr.co.automl.domain.metadata.domain.dataset.Organization;
import kr.co.automl.domain.metadata.domain.dataset.Rights;
import kr.co.automl.domain.metadata.domain.dataset.Type;
import kr.co.automl.domain.metadata.domain.distribution.AccurualPeriodicity;
import kr.co.automl.domain.metadata.domain.distribution.Distribution;
import kr.co.automl.domain.metadata.dto.CreateMetaDataAttributes;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.stream.IntStream;

/**
 * 메타데이터 저장 담당
 */
@Service
public class MetadataSaver {
    private final DataSetRepository dataSetRepository;

    public MetadataSaver(DataSetRepository dataSetRepository) {
        this.dataSetRepository = dataSetRepository;
    }

    /**
     * 메타데이터를 저장합니다.
     * @param attributes 생성 시 필요한 필요한 요소들
     */
    @Transactional
    public void save(CreateMetaDataAttributes attributes) {
        Catalog catalog = Catalog.from(attributes.createCatalogAttributes());
        Distribution distribution = Distribution.from(attributes.createDistributionAttributes());

        DataSet dataSet = DataSet.from(attributes.createDataSetAttributes());
        dataSet.setRelation(catalog, distribution);

        dataSetRepository.save(dataSet);
    }

    @PostConstruct
    public void init() {
        IntStream.rangeClosed(1, 111)
                .forEach(i -> {
                    Catalog catalog = Catalog.builder()
                            .category(Category.CITY)
                            .theme(Theme.AIR_QUALITY)
                            .themeTaxonomy("themeTaxonomy")
                            .build();

                    Distribution distribution = Distribution.builder()
                            .title("destribution title")
                            .description("destribution description")
                            .downloadUrl("downloadUrl")
                            .temporalResolution("temporalResolution")
                            .accurualPeriodicity(AccurualPeriodicity.DAY)
                            .spatial("spatial")
                            .temporal("temporal")
                            .build();

                    DataSet dataSet = DataSet.builder()
                            .title("데이터셋 이름")
                            .organization(new Organization(
                                    "위세아이텍",
                                    Creator.WISE_I_TECH,
                                    new ContactPoint("박주영", "jypark1@wise.co.kr")
                            ))
                            .type(Type.IMAGE)
                            .keyword("키워드1, 키워드2, 키워드1")
                            .licenseInfo(new LicenseInfo(License.CLUST, Rights.ALL))
                            .description("데이터셋 설명")
                            .build();

                    dataSet.setRelation(catalog, distribution);

                    dataSetRepository.save(dataSet);
                });
    }
}
