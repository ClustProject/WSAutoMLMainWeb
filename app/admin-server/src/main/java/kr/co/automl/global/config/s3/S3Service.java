package kr.co.automl.global.config.s3;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ListObjectsV2Request;
import com.amazonaws.services.s3.model.ListObjectsV2Result;
import com.amazonaws.services.s3.model.S3ObjectSummary;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class S3Service {
    private final AmazonS3Client amazonS3Client;
    private final String bucketName;
    private final String secondBucketName;

    public void deleteFile(String key) {
        amazonS3Client.deleteObject(bucketName, key);
    }

    /**
     * 받아은 key값(데이터셋 파일명)을 포함한 객체를 나열하고 삭제합니다.
     */
    public void deleteFilesWithPrefixInSecondBucket(String prefix) {
        ListObjectsV2Request req = new ListObjectsV2Request().withBucketName(secondBucketName);
        ListObjectsV2Result result;

        do {
            result = amazonS3Client.listObjectsV2(req);

            // If no objects in the bucket match the prefix, return immediately
            if (result.getObjectSummaries().isEmpty()) {
                return;
            }
            for (S3ObjectSummary objectSummary : result.getObjectSummaries()) {
                if (objectSummary.getKey().contains(prefix)) {
                    amazonS3Client.deleteObject(secondBucketName, objectSummary.getKey());
                }
            }

            // continue listing if there are more keys
            String token = result.getNextContinuationToken();
            req.setContinuationToken(token);
        } while (result.isTruncated());
    }
}
