package kr.co.automl.infra;

import kr.co.automl.domain.user.User;
import kr.co.automl.domain.user.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.Collection;
import java.util.List;
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

    @Override
    public Page<User> findAll(Pageable pageable) {
        List<User> users = users().stream()
                .toList();

        int pageNumber = pageable.getPageNumber();
        int pageSize = pageable.getPageSize();

        int start = pageNumber * pageSize;
        int last = (1 + pageNumber) * pageSize;

        if (last > users.size()) {
            last = users.size();
        }

        return new PageImpl<>(users.subList(start, last), pageable, users.size());
    }

    @Override
    public List<User> findAll() {
        return users().stream()
                .toList();
    }

    private Collection<User> users() {
        return map.values();
    }
}
