package kr.co.automl.domain.metadata;

/**
 * 배포 주기
 */
public enum AccurualPeriodicity {
    TIME("시간"),
    DAY("일"),
    WEEK("주"),
    MONTH("월"),
    NAN("Nan");

    private final String name;

    AccurualPeriodicity(String name) {
        this.name = name;
    }
}
