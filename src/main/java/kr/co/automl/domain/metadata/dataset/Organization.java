package kr.co.automl.domain.metadata.dataset;

/**
 * 구축기관
 */
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
}
