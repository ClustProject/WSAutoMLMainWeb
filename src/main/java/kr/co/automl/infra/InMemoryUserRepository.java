package kr.co.automl.infra;

import kr.co.automl.domain.user.User;
import kr.co.automl.domain.user.UserRepository;

import java.util.Collection;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

public class InMemoryUserRepository implements UserRepository {
    private static final Map<Long, User> map = new ConcurrentHashMap<>();

    @Override
    public Optional<User> findByEmail(String email) {
        return users().stream()
                .filter(user -> user.matchEmail(email))
                .findFirst();
    }

    @Override
    public User save(User user) {
        if (existEmail(user)) {
            remove(user);
        }

        long id = user.getId();
        map.put(id, user);

        return user;
    }

    @Override
    public void deleteAll() {
        map.clear();
    }

    @Override
    public Optional<User> findById(long userId) {
        User user = map.get(userId);

        return Optional.ofNullable(user);
    }

    private void remove(User user) {
        users().remove(user);
    }

    private boolean existEmail(User user) {
        return users().stream()
                .anyMatch(user::matchEmail);
    }

    private Collection<User> users() {
        return map.values();
    }
}
