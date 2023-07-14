package kr.co.automl.global.config.s3;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class S3FileController {
    private final S3Service s3Service;

    @PostMapping("/files")
    public void deleteFiles(@RequestBody List<String> keys) {
        keys.forEach(s3Service::deleteFile);
    }
}
