package kr.co.automl.domain.user;

import java.util.Optional;

public interface UserRepository {
    Optional<User> findByEmail(String email);

    User save(User user);

    void deleteAll();
}
