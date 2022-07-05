package kr.co.automl.global.utils.s3;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.net.URL;

/**
 * PreSignedUrl 제공을 담당합니다.
 */
@Component
@RequiredArgsConstructor
public class PreSignedUrlProvider {

    private final AmazonS3Client amazonS3Client;
    private final String bucketName;

    /**
     * 파일 이름을 통해 생성한 PreSignedUrl을 리턴합니다.
     * @param filename 생성할 파일 이름
     * @return 생성한 PreSignedUrl
     */
    public String getWithFilename(String filename) {
        GeneratePresignedUrlRequest request = new GeneratePresignedUrlRequest(
                bucketName,
                getKey(filename),
                HttpMethod.PUT
        );

        URL url = amazonS3Client.generatePresignedUrl(request);

        return url.toString();
    }

    String getKey(String filename) {
        return filename;
    }
}
