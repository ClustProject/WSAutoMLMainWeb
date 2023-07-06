package kr.co.automl.global.config.s3;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class S3FileController {
    private final S3Service s3Service;

    @DeleteMapping("/file/{key}")
    public void deleteFile(@PathVariable String key) {
        s3Service.deleteFile(key);
    }
}
