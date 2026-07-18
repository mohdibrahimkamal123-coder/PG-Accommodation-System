package com.Project.SmartStay.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import com.Project.SmartStay.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
	Optional<User> findByEmail(String email);
	long count();
	Optional<User> findByBlocked(Boolean blocked);

}