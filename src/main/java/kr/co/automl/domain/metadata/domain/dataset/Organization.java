package kr.co.automl.domain.metadata.domain.dataset;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import javax.persistence.Embedded;

import static lombok.AccessLevel.PROTECTED;

/**
 * 구축기관
 */
@Embeddable
@NoArgsConstructor(access = PROTECTED)
@Getter
@EqualsAndHashCode
public class Organization {
    private String publisher;
    private Creator creator;

    @Embedded
    private ContactPoint contactPoint;

    public Organization(String publisher, Creator creator, ContactPoint contactPoint) {
        this.publisher = publisher;
        this.creator = creator;
        this.contactPoint = contactPoint;
    }

    public static Organization of(String publisher, String creatorName, String contactPointName) {
        Creator creator = Creator.ofName(creatorName);
        ContactPoint contactPoint = creator.findContactBy(contactPointName);

        return new Organization(publisher, creator, contactPoint);
    }
}
