package kr.co.automl.domain.metadata;

/**
 * 생성자
 */
public enum Creator {
    WISE_I_TECH("위세아이텍"),
    KETI("KETI"),
    K_WEATHER("케이웨더(주)"),
    KWANGWOON_UNIVERSITY("광운대"),
    KOREA_UNIVERSITY("고려대");

    private final String name;

    Creator(String name) {
        this.name = name;
    }
}
