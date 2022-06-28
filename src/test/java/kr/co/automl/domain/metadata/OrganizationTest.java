package kr.co.automl.domain.metadata;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class OrganizationTest {

    @Test
    void of() {
        Organization org = Organization.of("위세아이텍", "위세아이텍", "박주영");

        assertThat(org).isEqualTo(new Organization(
                "위세아이텍",
                Creator.WISE_I_TECH,
                new ContactPoint("박주영", "01022983409", "jypark1@wise.co.kr"))
        );
    }
}
