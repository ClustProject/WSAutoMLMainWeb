package kr.co.automl.infra;

import kr.co.automl.domain.user.User;
import kr.co.automl.domain.user.UserRepository;
import org.springframework.context.annotation.Primary;
import org.springframework.data.repository.CrudRepository;

@Primary
public interface JpaUserRepository extends UserRepository, CrudRepository<User, Long> {
}
