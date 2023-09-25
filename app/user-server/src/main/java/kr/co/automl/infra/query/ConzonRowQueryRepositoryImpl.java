package kr.co.automl.infra.query;

import static kr.co.automl.domain.conzon.QConzonRow.conzonRow;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;

import kr.co.automl.domain.conzon.ConzonRowQueryRepository;
import kr.co.automl.domain.conzon.dto.ConzonDataDto;
import kr.co.automl.domain.conzon.dto.ConzonDateDto;
import kr.co.automl.domain.conzon.dto.ConzonIdNameDto;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ConzonRowQueryRepositoryImpl implements ConzonRowQueryRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<ConzonIdNameDto> findDistinctByConzonId() {
        return queryFactory
                .select(conzonRow.conzonId, conzonRow.conzonName)
                .from(conzonRow)
                .groupBy(conzonRow.conzonId, conzonRow.conzonName)
                .orderBy(conzonRow.conzonName.asc())
                .fetch()
                .stream()
                .map(tuple -> new ConzonIdNameDto(tuple.get(conzonRow.conzonId), tuple.get(conzonRow.conzonName)))
                .collect(Collectors.toList());
    }

    @Override
    public List<ConzonDateDto> findDistinctByConzonDate() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        return queryFactory
                .selectDistinct(conzonRow.conzonDate)
                .from(conzonRow)
                .fetch()
                .stream()
                .map(date -> new ConzonDateDto(date.toLocalDate().format(formatter))) // 날짜 형식 변환
                .collect(Collectors.toList());
    }

    @Override
    public List<ConzonDataDto> findConzonData(String conzonId, String conzonDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(conzonDate, formatter);

        return queryFactory
                .select(conzonRow.conzonData)
                .from(conzonRow)
                .where(conzonRow.conzonId.eq(conzonId)
                        .and(conzonRow.conzonDate.eq(localDate.atStartOfDay())))
                .fetch()
                .stream()
                .map(ConzonDataDto::new)
                .collect(Collectors.toList());
    }

}
