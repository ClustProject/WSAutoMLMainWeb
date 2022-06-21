package kr.co.automl.domain.user.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class ObjectToStringConverter {
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static String convert(Object object) throws JsonProcessingException {
        return objectMapper.writeValueAsString(object);
    }
}
