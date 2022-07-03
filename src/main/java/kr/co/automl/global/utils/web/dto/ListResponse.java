package kr.co.automl.global.utils.web.dto;

import java.util.List;

/**
 * 배열 형태의 DTO가 들어올 경우 다음과 같이 변환합니다.
 *
 * "data" : [
 *      { }
 * ]
 *
 * @param <T>
 */
public record ListResponse<T>(
        List<T> data
) {
}
