package kr.co.automl.global.config.s3;

import com.amazonaws.services.s3.AmazonS3Client;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class S3Service {
    private final AmazonS3Client amazonS3Client;
    private final String bucketName;

    public void deleteFile(String key) {
        amazonS3Client.deleteObject(bucketName, key);
    }
}
