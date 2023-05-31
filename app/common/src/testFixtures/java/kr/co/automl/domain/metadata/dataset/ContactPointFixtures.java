package kr.co.automl.domain.metadata.dataset;

import kr.co.automl.domain.metadata.domain.dataset.ContactPoint;

public class ContactPointFixtures {

    private ContactPointFixtures() {
    }

    public static ContactPoint fixture1() {
        return new ContactPoint(
                "김영욱",
                "ywkim@wise.co.kr");
    }

    public static ContactPoint fixture2() {
        return new ContactPoint(
                "최태동",
                "tdchoi@wise.co.kr");
    }
}
