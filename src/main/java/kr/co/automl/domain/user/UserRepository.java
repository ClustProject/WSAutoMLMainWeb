package kr.co.automl.domain.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface UserRepository {
    Optional<User> findByEmail(String email);

    User save(User user);

    void deleteAll();

    Optional<User> findById(long userId);

    Page<User> findAll(Pageable pageable);
}
