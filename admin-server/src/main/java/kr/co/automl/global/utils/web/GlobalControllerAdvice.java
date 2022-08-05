package kr.co.automl.global.utils.web;

import kr.co.automl.domain.metadata.domain.catalog.exceptions.CannotFindMatchCategoryException;
import kr.co.automl.domain.metadata.domain.catalog.exceptions.CannotFindMatchThemeException;
import kr.co.automl.domain.metadata.domain.dataset.exceptions.CannotFindDataSetException;
import kr.co.automl.domain.metadata.domain.dataset.exceptions.CannotFindMatchContactNameException;
import kr.co.automl.domain.metadata.domain.dataset.exceptions.CannotFindMatchCreatorException;
import kr.co.automl.domain.metadata.domain.dataset.exceptions.CannotFindMatchRightsException;
import kr.co.automl.domain.metadata.domain.dataset.exceptions.CannotFindMatchTypeException;
import kr.co.automl.domain.user.exceptions.AlreadyAdminRoleException;
import kr.co.automl.domain.user.exceptions.CannotChangeAdminRoleException;
import kr.co.automl.domain.user.exceptions.CannotFindUserException;
import kr.co.automl.global.utils.web.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalControllerAdvice {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({
            CannotFindMatchCategoryException.class,
            CannotFindMatchThemeException.class,
            CannotFindMatchContactNameException.class,
            CannotFindMatchCreatorException.class,
            CannotFindMatchRightsException.class,
            CannotFindMatchTypeException.class,
            AlreadyAdminRoleException.class,
            CannotChangeAdminRoleException.class,
            CannotFindUserException.class
    })
    public ErrorResponse responseBadRequestAndReturnErrorResponse(
            RuntimeException runtimeException
    ) {
        return new ErrorResponse(runtimeException.getMessage());
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler({
            CannotFindDataSetException.class
    })
    public ErrorResponse responseNotFoundAndReturnErrorResponse(
            RuntimeException runtimeException
    ) {
        return new ErrorResponse(runtimeException.getMessage());
    }
}
