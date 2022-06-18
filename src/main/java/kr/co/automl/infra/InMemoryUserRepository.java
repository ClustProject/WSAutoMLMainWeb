package kr.co.automl.infra;

import kr.co.automl.domain.user.User;
import kr.co.automl.domain.user.UserRepository;

import java.util.Collection;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

//@Repository
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

        long id = IdGenerator.generateId();
        map.put(id, user);

        return user;
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

    private static class IdGenerator {
        private static long id = 0L;

        public static long generateId() {
            increaseId();

            return id;
        }

        private static synchronized void increaseId() {
            id++;
        }
    }
}
