package kr.co.automl.infra;

import kr.co.automl.domain.user.User;
import kr.co.automl.domain.user.UserRepository;
import org.springframework.data.repository.CrudRepository;

public interface JpaUserRepository extends UserRepository, CrudRepository<User, Long> {
}
