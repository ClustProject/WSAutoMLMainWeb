package kr.co.automl.domain.metadata.distribution;

import java.util.Arrays;
import java.util.Objects;

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

    public static AccurualPeriodicity ofName(String name) {
        return Arrays.stream(values())
                .filter(accurualPeriodicity -> accurualPeriodicity.matchName(name))
                .findFirst()
                .orElse(AccurualPeriodicity.NAN);
    }

    private boolean matchName(String name) {
        return Objects.equals(this.name, name);
    }
}
