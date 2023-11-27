package kr.co.automl.api;

import kr.co.automl.dto.PreSignedUrlResponse;
import kr.co.automl.service.PreSignedUrlProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;

@RestController
@RequiredArgsConstructor
public class UrlApi {

    private final PreSignedUrlProvider preSignedUrlProvider;

    @GetMapping("/url/presigned")
    public PreSignedUrlResponse getPreSignedUrls(@PathParam("filename") String filename) {
        return preSignedUrlProvider.getUploadAndDownloadUrl(filename);
    }
}
