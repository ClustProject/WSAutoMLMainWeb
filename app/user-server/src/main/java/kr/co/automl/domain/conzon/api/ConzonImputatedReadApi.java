package kr.co.automl.domain.conzon.api;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import kr.co.automl.domain.conzon.dto.ConzonDataDto;
import kr.co.automl.domain.conzon.dto.ConzonDateDto;
import kr.co.automl.domain.conzon.dto.ConzonIdNameDto;
import kr.co.automl.domain.conzon.service.ConzonImputatedReader;
import kr.co.automl.global.utils.web.dto.ListToDataResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ConzonImputatedReadApi {

    private final ConzonImputatedReader conzonImputatedReader;

    @GetMapping("/conzon/imputated/id/distinct")
    public ListToDataResponse<ConzonIdNameDto> getDistinctConzonId() {
        List<ConzonIdNameDto> conzonIdNameDtos = conzonImputatedReader.readDistinctByConzonId();
        return new ListToDataResponse<>(conzonIdNameDtos);
    }

    @GetMapping("/conzon/imputated/date/distinct")
    public ListToDataResponse<ConzonDateDto> getDistinctConzonDate() {
        List<ConzonDateDto> conzonDateDtos = conzonImputatedReader.readDistinctByConzonDate();
        return new ListToDataResponse<>(conzonDateDtos);
    }

    @GetMapping("/conzon/imputated/{conzonId}/{conzonDate}")
    public ListToDataResponse<ConzonDataDto> getConzonData(@PathVariable String conzonId,
            @PathVariable String conzonDate) {
        List<ConzonDataDto> conzonDataDtos = conzonImputatedReader.readConzonData(conzonId, conzonDate);
        return new ListToDataResponse<>(conzonDataDtos);
    }
}
