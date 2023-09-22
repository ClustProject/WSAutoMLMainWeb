package kr.co.automl.infra.query;

import static kr.co.automl.domain.conzon.QConzonImputated.conzonImputated;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;

import kr.co.automl.domain.conzon.ConzonImputatedQueryRepository;
import kr.co.automl.domain.conzon.dto.ConzonDataDto;
import kr.co.automl.domain.conzon.dto.ConzonDateDto;
import kr.co.automl.domain.conzon.dto.ConzonIdNameDto;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ConzonImputatedQueryRepositoryImpl
                implements ConzonImputatedQueryRepository {

        private final JPAQueryFactory queryFactory;

        @Override
        public List<ConzonIdNameDto> findDistinctByConzonId() {
                return queryFactory
                                .select(conzonImputated.conzonId, conzonImputated.conzonName)
                                .from(conzonImputated)
                                .groupBy(conzonImputated.conzonId, conzonImputated.conzonName)
                                .fetch()
                                .stream()
                                .map(tuple -> new ConzonIdNameDto(tuple.get(conzonImputated.conzonId),
                                                tuple.get(conzonImputated.conzonName)))
                                .collect(Collectors.toList());
        }

        @Override
        public List<ConzonDateDto> findDistinctByConzonDate() {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

                return queryFactory
                                .selectDistinct(conzonImputated.conzonDate)
                                .from(conzonImputated)
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
                                .select(conzonImputated.conzonData)
                                .from(conzonImputated)
                                .where(conzonImputated.conzonId.eq(conzonId)
                                                .and(conzonImputated.conzonDate.eq(localDate.atStartOfDay())))
                                .fetch()
                                .stream()
                                .map(ConzonDataDto::new)
                                .collect(Collectors.toList());
        }
}
