package kr.co.automl.domain.metadata;

import kr.co.automl.domain.metadata.exceptions.CannotFindMatchContactNameException;

import java.util.Arrays;
import java.util.List;

public class ContactPoints {
    private final List<ContactPoint> contactPoints;

    public ContactPoints(ContactPoint... contactPoints) {
        this.contactPoints = Arrays.asList(contactPoints);
    }

    public ContactPoint findByName(String name) {
        return this.contactPoints.stream()
                .filter(it -> it.matchName(name))
                .findFirst()
                .orElseThrow(CannotFindMatchContactNameException::new);
    }
}
