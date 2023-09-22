package kr.co.automl.domain.conzon.api;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import kr.co.automl.domain.conzon.dto.ConzonDataDto;
import kr.co.automl.domain.conzon.dto.ConzonDateDto;
import kr.co.automl.domain.conzon.dto.ConzonIdNameDto;
import kr.co.automl.domain.conzon.service.ConzonRowReader;
import kr.co.automl.global.utils.web.dto.ListToDataResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ConzonRowReadApi {

    private final ConzonRowReader conzonRowReader;

    @GetMapping("/conzon/row/id/distinct")
    public ListToDataResponse<ConzonIdNameDto> getDistinctConzonId() {
        List<ConzonIdNameDto> conzonIdNameDtos = conzonRowReader.readDistinctByConzonId();
        return new ListToDataResponse<>(conzonIdNameDtos);
    }

    @GetMapping("/conzon/row/date/distinct")
    public ListToDataResponse<ConzonDateDto> getDistinctConzonDate() {
        List<ConzonDateDto> conzonDateDtos = conzonRowReader.readDistinctByConzonDate();
        return new ListToDataResponse<>(conzonDateDtos);
    }

    @GetMapping("/conzon/row/{conzonId}/{conzonDate}")
    public ListToDataResponse<ConzonDataDto> getConzonData(@PathVariable String conzonId,
            @PathVariable String conzonDate) {
        List<ConzonDataDto> conzonDataDtos = conzonRowReader.readConzonData(conzonId, conzonDate);
        return new ListToDataResponse<>(conzonDataDtos);
    }
}
