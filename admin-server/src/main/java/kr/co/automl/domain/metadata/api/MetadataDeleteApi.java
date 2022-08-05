package kr.co.automl.domain.metadata.api;

import kr.co.automl.domain.metadata.service.MetadataRemover;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MetadataDeleteApi {

    private final MetadataRemover metadataRemover;

    public MetadataDeleteApi(MetadataRemover metadataRemover) {
        this.metadataRemover = metadataRemover;
    }

    @DeleteMapping("/metadata/{id}")
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    public ResponseEntity<Object> deleteMetadata(
            @PathVariable long id
    ) {
        metadataRemover.remove(id);

        return ResponseEntity.noContent()
                .build();
    }
}
