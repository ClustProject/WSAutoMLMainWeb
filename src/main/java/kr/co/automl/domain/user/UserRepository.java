package kr.co.automl.domain.user;

import java.util.List;
import java.util.Optional;

public interface UserRepository {
    Optional<User> findByEmail(String email);

    User save(User user);

    void deleteAll();

    Optional<User> findById(long userId);

    List<User> findAll();
}
