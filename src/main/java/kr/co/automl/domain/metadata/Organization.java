package kr.co.automl.domain.metadata;

/**
 * 구축기관
 */
public record Organization(
        /* 제공기관 */
        String publisher,
        /* 컨소기관 */
        String creator,
        /* 연락처 */
        ContactPoint contactPoint
) {
}
