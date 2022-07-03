package kr.co.automl.domain.metadata.dto;

import kr.co.automl.domain.metadata.domain.catalog.Catalog;
import kr.co.automl.domain.metadata.domain.dataset.ContactPoint;
import kr.co.automl.domain.metadata.domain.dataset.DataSet;
import kr.co.automl.domain.metadata.domain.dataset.LicenseInfo;
import kr.co.automl.domain.metadata.domain.dataset.Organization;
import kr.co.automl.domain.metadata.domain.distribution.Distribution;
import lombok.Builder;

public record MetadataResponse(
        String category,
        String theme,
        String themeTaxonomy,
        String title,
        String publisher,
        String creator,
        String contactPointName,
        String contactPointEmail,
        String type,
        String keyword,
        String license,
        String rights,
        String description,
        String distributionTitle,
        String distributionDescription,
        String downloadUrl,
        String temporalResolution,
        String accurualPeriodicity,
        String spatial,
        String temporal
) {

    @Builder
    public MetadataResponse {
    }

    public static MetadataResponse from(DataSet dataSet) {
        Catalog catalog = dataSet.getCatalog();
        Distribution distribution = dataSet.getDistribution();

        Organization organization = dataSet.getOrganization();
        LicenseInfo licenseInfo = dataSet.getLicenseInfo();
        ContactPoint contactPoint = organization.getContactPoint();

        return MetadataResponse.builder()
                .category(catalog.getCategory().getName())
                .theme(catalog.getTheme().getName())
                .themeTaxonomy(catalog.getThemeTaxonomy())
                .title(dataSet.getTitle())
                .publisher(organization.getPublisher())
                .creator(organization.getCreator().getName())
                .contactPointName(contactPoint.getName())
                .contactPointEmail(contactPoint.getEmail())
                .type(dataSet.getType().getName())
                .keyword(dataSet.getKeyword())
                .license(licenseInfo.getLicense().name())
                .rights(licenseInfo.getRights().name())
                .description(dataSet.getDescription())
                .distributionTitle(distribution.getTitle())
                .distributionDescription(distribution.getDescription())
                .downloadUrl(distribution.getDownloadUrl())
                .temporalResolution(distribution.getTemporalResolution())
                .accurualPeriodicity(distribution.getAccurualPeriodicity().getName())
                .spatial(distribution.getSpatial())
                .temporal(distribution.getTemporal())
                .build();
    }

}
