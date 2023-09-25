package kr.co.automl.domain.conzon.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.automl.domain.conzon.ConzonImputatedQueryRepository;
import kr.co.automl.domain.conzon.dto.ConzonDataDto;
import kr.co.automl.domain.conzon.dto.ConzonDateDto;
import kr.co.automl.domain.conzon.dto.ConzonIdNameDto;

@Service
@Transactional(readOnly = true)
public class ConzonImputatedReader {

    private final ConzonImputatedQueryRepository conzonImputatedQueryRepository;

    public ConzonImputatedReader(ConzonImputatedQueryRepository conzonImputatedQueryRepository) {
        this.conzonImputatedQueryRepository = conzonImputatedQueryRepository;
    }

    public List<ConzonIdNameDto> readDistinctByConzonId() {
        return conzonImputatedQueryRepository.findDistinctByConzonId();
    }

    public List<ConzonDateDto> readDistinctByConzonDate() {
        return conzonImputatedQueryRepository.findDistinctByConzonDate();
    }

    public List<ConzonDataDto> readConzonData(String conzonId, String conzonDate) {
        return conzonImputatedQueryRepository.findConzonData(conzonId, conzonDate);
    }
}
