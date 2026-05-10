package com.example.demo.servies;

import com.example.demo.model.RecipeBook;
import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeBookRepository extends JpaRepository<RecipeBook, Long> {
    List<RecipeBook> findAllByUser(User user);
    List<RecipeBook> findByUserId(Long userId);
}
