package kr.co.automl.global.utils.s3;

import com.amazonaws.services.s3.AmazonS3Client;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class PreSignedUrlProviderTest {

    private static final String TEST_BUCKET_NAME = "testBucketName";

    @Autowired
    private AmazonS3Client amazonS3Client;

    private PreSignedUrlProvider preSignedUrlProvider;

    @BeforeEach
    void setUp() {
        this.preSignedUrlProvider = new PreSignedUrlProvider(amazonS3Client, TEST_BUCKET_NAME) {

            @Override
            protected String getKey(String filename) {
                return filename;
            }
        };
    }

    @Nested
    class getWithFilename_메서드는 {

        @Test
        void 업로드할_파일의_URL을_리턴한다() {
            String filename = "a.csv";

            String url = preSignedUrlProvider.getWithFilename(filename);

            assertThat(url).startsWith(String.format("https://s3.ap-northeast-2.amazonaws.com/%s/%s",
                    TEST_BUCKET_NAME,
                    filename
            ));
        }
    }
}
