package kr.co.automl.domain.conzon;

import java.util.List;

import kr.co.automl.domain.conzon.dto.ConzonDataDto;
import kr.co.automl.domain.conzon.dto.ConzonDateDto;
import kr.co.automl.domain.conzon.dto.ConzonIdNameDto;

public interface ConzonRowQueryRepository {
    List<ConzonIdNameDto> findDistinctByConzonId();

    List<ConzonDateDto> findDistinctByConzonDate();

    List<ConzonDataDto> findConzonData(String conzonId, String conzonDate);
}
