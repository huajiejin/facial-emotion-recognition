package io.github.huajiejin.facialemotionrecognitionserver.api.user;

import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, Integer> {
    Role findByRole(String role);
}
