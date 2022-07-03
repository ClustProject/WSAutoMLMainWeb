package kr.co.automl.domain.metadata.dto;

import kr.co.automl.domain.metadata.domain.dataset.LicenseInfo;
import kr.co.automl.domain.metadata.domain.dataset.Organization;
import lombok.Builder;

public record DataSetResponse(

        String title,
        Organization organization,
        String type,
        String keyword,
        LicenseInfo licenseInfo,
        String description
) {

    @Builder
    public DataSetResponse {
    }
}
