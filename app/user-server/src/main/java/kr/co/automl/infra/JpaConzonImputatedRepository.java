package kr.co.automl.infra;

import org.springframework.data.jpa.repository.JpaRepository;

import kr.co.automl.domain.conzon.ConzonImputated;

public interface JpaConzonImputatedRepository extends JpaRepository<ConzonImputated, Long> {

}
