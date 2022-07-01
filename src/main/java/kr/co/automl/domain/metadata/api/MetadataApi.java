package kr.co.automl.domain.metadata.api;

import kr.co.automl.domain.metadata.dto.CreateMetaDataAttributes;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.net.URISyntaxException;

@RestController
@RequestMapping("metadata")
@PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
public class MetadataApi {

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void create(
            @RequestBody @Valid CreateMetaDataAttributes attribues
    ) throws URISyntaxException {
        // TODO: 2022/07/01 개발 해야함
    }
}
