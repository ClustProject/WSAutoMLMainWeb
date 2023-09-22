package kr.co.automl.infra;

import org.springframework.data.jpa.repository.JpaRepository;

import kr.co.automl.domain.conzon.ConzonRow;

public interface JpaConzonRowRepository extends JpaRepository<ConzonRow, Long> {

}
