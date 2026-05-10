package com.example.demo.servies;

import com.example.demo.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    void deleteByRecipeBook_Id(Long recipeBookId);
}
