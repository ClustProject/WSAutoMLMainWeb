package kr.co.automl.domain.metadata;

/**
 * 구축기관
 */
public record Organization(
        String publisher,
        Creator creator,
        ContactPoint contactPoint
) {
}
