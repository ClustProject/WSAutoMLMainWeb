package kr.co.automl.domain.metadata.dataset;

import lombok.Builder;

import javax.persistence.Embeddable;

/**
 * 구축기관
 */
@Embeddable
public record Organization(
        String publisher,
        Creator creator,
        ContactPoint contactPoint
) {

    public static Organization of(String publisher, String creatorName, String contactPointName) {
        Creator creator = Creator.ofName(creatorName);
        ContactPoint contactPoint = creator.findContactBy(contactPointName);

        return new Organization(publisher, creator, contactPoint);
    }

    @Builder
    public Organization {
    }
}
