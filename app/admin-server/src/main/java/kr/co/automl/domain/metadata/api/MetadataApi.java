package kr.co.automl.domain.metadata.api;

import kr.co.automl.domain.metadata.dto.CreateMetaDataAttributes;
import kr.co.automl.domain.metadata.dto.MetadataResponse;
import kr.co.automl.domain.metadata.service.MetadataService;
import kr.co.automl.global.utils.web.dto.ListToDataResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("metadata")
@PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
public class MetadataApi {

    private final MetadataService metadataService;

    public MetadataApi(MetadataService metadataService) {
        this.metadataService = metadataService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@RequestBody @Valid CreateMetaDataAttributes attributes) throws URISyntaxException {
        metadataService.save(attributes);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteMetadata(@PathVariable long id) {
        metadataService.remove(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ListToDataResponse<MetadataResponse> getAllMetadata(Pageable pageable) {
        List<MetadataResponse> metadataResponses = metadataService.readAll(pageable);
        return new ListToDataResponse<>(metadataResponses);
    }
}