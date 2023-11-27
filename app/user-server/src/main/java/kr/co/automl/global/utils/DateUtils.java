package kr.co.automl.global.utils;

import org.joda.time.DateTime;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtils {

    private static final String DATE_FORMAT = "yyyyMMdd-HHmmss";

    /**
     * 날짜를 포맷된 문자열로 리턴합니다.
     * @param dateTime 포맷할 날짜
     * @return 포맷된 문자열
     */
    public static String getFormattedDateString(DateTime dateTime) {
        Date date = dateTime.toDate();

        DateFormat dateFormat = new SimpleDateFormat(DATE_FORMAT);

        return dateFormat.format(date);
    }
}
