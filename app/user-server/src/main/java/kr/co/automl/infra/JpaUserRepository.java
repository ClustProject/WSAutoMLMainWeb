package kr.co.automl.infra;

import kr.co.automl.domain.user.User;
import kr.co.automl.domain.user.UserRepository;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.JpaRepository;

@Primary
public interface JpaUserRepository extends UserRepository, JpaRepository<User, Long> {
}
