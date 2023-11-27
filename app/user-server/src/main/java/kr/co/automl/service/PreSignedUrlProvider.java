package kr.co.automl.service;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3Client;

import kr.co.automl.dto.PreSignedUrlResponse;
import kr.co.automl.global.utils.DateUtils;
import lombok.RequiredArgsConstructor;
import org.joda.time.DateTime;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;

import java.net.URL;
import java.util.Date;

/**
 * PreSignedUrl 제공을 담당합니다.
 */
@Component
@RequiredArgsConstructor
public class PreSignedUrlProvider {

    private static final int EXPIRATION_DAYS = 1;

    private final AmazonS3Client amazonS3Client;
    private final String bucketName;

    /**
     * 파일 이름을 통해 생성한 PreSignedUrl을 리턴합니다.
     * 
     * @param filename 생성할 파일 이름
     * @return 생성한 PreSignedUrl
     */
    public PreSignedUrlResponse getUploadAndDownloadUrl(String filename) {
        validateEmpty(filename);

        Date expiration = DateTime.now().plusDays(EXPIRATION_DAYS).toDate();
        String key = getKey(filename);

        // 업로드를 위한 PUT 요청용 URL 생성
        URL uploadUrl = amazonS3Client.generatePresignedUrl(bucketName, key, expiration, HttpMethod.PUT);

        // 다운로드를 위한 GET 요청용 URL 생성
        URL downloadUrl = amazonS3Client.generatePresignedUrl(bucketName, key, expiration, HttpMethod.GET);

        return new PreSignedUrlResponse(uploadUrl.toString(), downloadUrl.toString());
    }

    /**
     * 비어있는지 검증합니다.
     * 
     * @param filename 검증할 파일 이름
     *
     * @throws IllegalArgumentException 파일 이름 검증에 실패할경우
     */
    private void validateEmpty(String filename) {
        if (ObjectUtils.isEmpty(filename)) {
            throw new IllegalArgumentException("파일이름은 비어있을 수 없습니다.");
        }
    }

    /**
     * 키를 리턴합니다. 키는 파일 저장소에서 유일한 값이자 저장되는 파일 이름입니다.
     * 
     * @param filename 파일 이름
     * @return 키
     */
    String getKey(String filename) {
        String keyPrefix = DateUtils.getFormattedDateString(DateTime.now());

        return "TmpFile-" + keyPrefix + "-" + filename;
    }
}
