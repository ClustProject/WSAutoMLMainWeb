package kr.co.automl.domain.metadata.dataset;

import kr.co.automl.domain.metadata.domain.dataset.Creator;
import kr.co.automl.domain.metadata.domain.dataset.Organization;

public class OrganizationFixtures {

    private OrganizationFixtures() {
    }

    public static Organization fixture1() {
        return new Organization(
                "위세아이텍",
                Creator.WISE_I_TECH,
                ContactPointFixtures.fixture1()
        );
    }
}
