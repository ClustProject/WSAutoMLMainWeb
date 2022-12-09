package kr.co.automl.domain.metadata.dataset;

import kr.co.automl.domain.metadata.domain.dataset.ContactPoint;

public class ContactPointFixtures {

    private ContactPointFixtures() {
    }

    public static ContactPoint fixture1() {
        return new ContactPoint(
                "김정연",
                "jykim@wise.co.kr"
        );
    }

    public static ContactPoint fixture2() {
        return new ContactPoint(
                "최태동",
                "tdchoi@wise.co.kr"
        );
    }
}
