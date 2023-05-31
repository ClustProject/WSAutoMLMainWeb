package kr.co.automl.domain.metadata.domain.result;

import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

import kr.co.automl.domain.metadata.domain.dataset.DataSet;
import kr.co.automl.domain.metadata.domain.dataset.dto.DataSetResponse;
import kr.co.automl.domain.metadata.domain.result.dto.ResultResponse;
import kr.co.automl.domain.user.User;
import kr.co.automl.domain.user.dto.UserResponse;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = PROTECTED)
@Getter
public class MlResult {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "ml_result_id")
    private Long id;

    @Lob
    @Column(name = "var_nm")
    private String varNm;

    @Lob
    @Column(name = "var_tg_yn")
    private String varTgYn;

    @Lob
    @Column(name = "var_use_yn")
    private String varUseYn;

    @Column(name = "arg_nm")
    private String argNm;

    @Lob
    @Column(name = "arg_param")
    private String argParam;

    @Column(name = "model_nm")
    private String modelNm;

    @Column(name = "date")
    private LocalDateTime date;

    @Column(name = "state")
    private String state;

    @Column(name = "metric")
    private String metric;

    @Column(name = "model_url")
    private String modelUrl;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "dataset_id")
    private DataSet dataSet;

    @Builder
    private MlResult(Long id, String varNm, String varTgYn, String varUseYn, String argNm, String argParam,
            String modelNm, String metric,
            LocalDateTime date, String state, String modelUrl, User user, DataSet dataSet) {
        this.id = id;
        this.varNm = varNm;
        this.varTgYn = varTgYn;
        this.varUseYn = varUseYn;
        this.argNm = argNm;
        this.argParam = argParam;
        this.modelNm = modelNm;
        this.metric = metric;
        this.date = date;
        this.state = state;
        this.modelUrl = modelUrl;
        this.user = user;
        this.dataSet = dataSet;
    }

    /**
     * 응답 객체를 리턴합니다. 주로 DTO에서 호출합니다.
     * 
     * @return 변환된 응답 객체
     */
    public ResultResponse toResponse() {
        return ResultResponse.builder()
                .id(this.id)
                .varNm(this.varNm)
                .varTgYn(this.varTgYn)
                .varUseYn(this.varUseYn)
                .argNm(this.argNm)
                .argParam(this.argParam)
                .modelNm(this.modelNm)
                .metric(this.metric)
                .date(this.date)
                .state(this.state)
                .modelUrl(this.modelUrl)
                .build();
    }

    /**
     * 데이터셋 응답 객체를 리턴합니다.
     * 
     * @return 데이터셋 응답 객체
     */
    public DataSetResponse toDataSetResponse() {
        return this.dataSet.toResponse();
    }

    /**
     * 유저 정보 응답 객체를 리턴합니다.
     * 
     * @return 유저 정보 응답 객체
     */
    public UserResponse toUserResponse() {
        return this.user.toResponse();
    }

    /**
     * 연관관계 편의 메서드. 양쪽의 연관관계를 모두 설정합니다.
     * 
     * @param dataSet 데이터셋
     * @param user    유저
     */
    public void setRelation(DataSet dataSet, User user) {
        this.dataSet = dataSet;
        this.user = user;
    }

}
