package kr.co.automl.domain.metadata;

/**
 * 구축기관
 */
public record Organization(
        /* 제공기관 */
        String publisher,
        /* 생성자 */
        Creator creator,
        /* 연락처 */
        ContactPoint contactPoint
) {
}
