package kr.co.automl.domain.metadata.domain.dataset.dto;

import java.time.LocalDate;

import kr.co.automl.domain.metadata.domain.dataset.LicenseInfo;
import kr.co.automl.domain.metadata.domain.dataset.Organization;
import lombok.Builder;

public record DataSetResponse(
        long id,
        String title,
        LocalDate issued,
        LocalDate modified,
        Organization organization,
        String type,
        String keyword,
        LicenseInfo licenseInfo,
        String description) {

    @Builder
    public DataSetResponse {
    }
}
