package kr.co.automl.api;

import kr.co.automl.dto.PreSignedUrlResponse;
import kr.co.automl.service.PreSignedUrlProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;

@RestController
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
public class UrlApi {

    private final PreSignedUrlProvider preSignedUrlProvider;

    @GetMapping("/url/presigned")
    public PreSignedUrlResponse getPreSignedUrl(
            @PathParam("filename") String filename
    ) {
        String url = preSignedUrlProvider.getWithFilename(filename);

        return new PreSignedUrlResponse(url);
    }
}
