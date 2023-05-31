// package kr.co.automl.domain.metadata.api;

// import kr.co.automl.domain.metadata.dto.MetadataResponse;
// import kr.co.automl.domain.metadata.service.MetadataReader;
// import kr.co.automl.global.utils.web.dto.ListToDataResponse;
// import lombok.RequiredArgsConstructor;
// import org.springframework.data.domain.Pageable;
// import org.springframework.security.access.prepost.PreAuthorize;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RestController;

// import java.util.List;

// @RestController
// @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
// @RequiredArgsConstructor
// public class MetadataReadApi {

// private final MetadataReader metadataReader;

// @GetMapping("metadata")
// public ListToDataResponse<MetadataResponse> getAllMetadata(Pageable pageable)
// {
// List<MetadataResponse> metadataResponses = metadataReader.readAll(pageable);

// return new ListToDataResponse<>(metadataResponses);
// }

// }
