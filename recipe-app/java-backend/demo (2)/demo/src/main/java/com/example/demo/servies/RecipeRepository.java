package com.example.demo.servies;

import com.example.demo.model.Recipe;
import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    void deleteByCategory_Id(Long categoryId);

    void deleteByRecipeBook_Id(Long recipeBookId);
}
