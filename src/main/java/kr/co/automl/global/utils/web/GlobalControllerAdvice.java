package kr.co.automl.global.utils.web;

import kr.co.automl.domain.user.exceptions.CannotFindUserException;
import kr.co.automl.global.utils.web.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GlobalControllerAdvice {

    @ExceptionHandler({
            CannotFindUserException.class
    })
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse responseBadRequestAndReturnErrorResponse(
            RuntimeException runtimeException
    ) {
        return new ErrorResponse(runtimeException.getMessage());
    }

}
