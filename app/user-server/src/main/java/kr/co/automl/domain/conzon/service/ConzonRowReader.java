package kr.co.automl.domain.conzon.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.automl.domain.conzon.ConzonRow;
import kr.co.automl.domain.conzon.ConzonRowQueryRepository;
import kr.co.automl.domain.conzon.dto.ConzonDataDto;
import kr.co.automl.domain.conzon.dto.ConzonDateDto;
import kr.co.automl.domain.conzon.dto.ConzonIdNameDto;
import kr.co.automl.domain.conzon.dto.ConzonRowResponse;

@Service
@Transactional(readOnly = true)
public class ConzonRowReader {

    private final ConzonRowQueryRepository conzonRowQueryRepository;

    public ConzonRowReader(ConzonRowQueryRepository conzonRowQueryRepository) {
        this.conzonRowQueryRepository = conzonRowQueryRepository;
    }

    public List<ConzonIdNameDto> readDistinctByConzonId() {
        return conzonRowQueryRepository.findDistinctByConzonId();
    }

    public List<ConzonDateDto> readDistinctByConzonDate() {
        return conzonRowQueryRepository.findDistinctByConzonDate();
    }

    public List<ConzonDataDto> readConzonData(String conzonId, String conzonDate) {
        return conzonRowQueryRepository.findConzonData(conzonId, conzonDate);
    }
}
