package kr.co.automl.global.utils.s3;

import com.amazonaws.services.s3.AmazonS3Client;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatIllegalArgumentException;

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
       
        @Nested
        class 빈_파일이름이_주어질경우 {

            @ParameterizedTest
            @NullAndEmptySource
            void IllegalArgumentException을_던진다(String filename) {
                assertThatIllegalArgumentException()
                        .isThrownBy(() -> preSignedUrlProvider.getWithFilename(filename));
            }
        }

        @Nested
        class 비어있지않은_파일이름이_주어진경우 {


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
}
