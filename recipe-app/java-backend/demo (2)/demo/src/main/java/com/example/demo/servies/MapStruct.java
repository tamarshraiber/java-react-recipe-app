package com.example.demo.servies;

import com.example.demo.dto.RecipeDTO;
import com.example.demo.model.Recipe;
import org.mapstruct.Mapper;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;


@Mapper(componentModel ="spring")
public interface MapStruct {

    static  String DIRECTORY_URL=System.getProperty("user.dir")+"\\images\\";

    List<RecipeDTO> recipesToDto(List<Recipe> recipes);

    default RecipeDTO recipeToDto(Recipe recipe) throws IOException {
        RecipeDTO recipeDto = new RecipeDTO();
        recipeDto.setId(recipe.getId());
        recipeDto.setName(recipe.getName());
        recipeDto.setDescription(recipe.getDescription());
        recipeDto.setRecipeBook(recipe.getRecipeBook());
        recipeDto.setCategory(recipe.getCategory());
        recipeDto.setProductAndQuantity(recipe.getProductAndQuantity());
        recipeDto.setMethodOfPreparation(recipe.getMethodOfPreparation());
        recipeDto.setImageUrl(recipe.getImageUrl());
        System.out.println(recipeDto.getImageUrl());
         if (recipe.getImageUrl() != null&& !recipe.getImageUrl().isEmpty()) {
            Path file = Paths.get(DIRECTORY_URL + recipe.getImageUrl());
            if (Files.exists(file)) {
                recipeDto.setImage(Files.readAllBytes(file));
            }
        } else {
            recipeDto.setImage(new byte[0]);
        }
         return recipeDto;
    }


}
