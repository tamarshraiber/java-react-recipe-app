package com.example.demo.controller;

import com.example.demo.dto.RecipeDTO;
import com.example.demo.model.Recipe;
import com.example.demo.model.User;
import com.example.demo.servies.MapStruct;
import com.example.demo.servies.RecipeRepository;
import com.example.demo.servies.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("api/recipe")
@CrossOrigin
public class RecipeController {
    private final UserRepository userRepository;
    private RecipeRepository recipeRepository;

    private MapStruct mapper;
    static  String DIRECTORY_URL=System.getProperty("user.dir")+"\\images\\";

    public RecipeController(RecipeRepository recipeRepository, UserRepository userRepository,MapStruct mapper) {
        this.mapper=mapper;
        this.recipeRepository = recipeRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/recipes")
    public ResponseEntity <List<RecipeDTO>> getRecipes(){
        return new ResponseEntity<>(mapper.recipesToDto(recipeRepository.findAll()), HttpStatus.OK);
    }


    @GetMapping("/getRecipeById/{id}")
    public ResponseEntity<RecipeDTO> getRecipeById(@PathVariable Long id) throws Exception{
        Recipe r=recipeRepository.findById(id).orElse(null);
        if(r==null)
            return new ResponseEntity<>(mapper.recipeToDto(r),HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(mapper.recipeToDto(r),HttpStatus.OK);
    }

    @PutMapping("/updaetRecipe/{id}")
    public ResponseEntity<RecipeDTO> updateRecipe(@PathVariable Long id, @RequestBody Recipe r) throws IOException {
        Recipe r1=recipeRepository.findById(id).orElse(null);
        if(r1==null){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        r1=recipeRepository.save(r);
        return new ResponseEntity<>(mapper.recipeToDto(r1),HttpStatus.CREATED);
    }

    @PostMapping("/addRecipe")
    public ResponseEntity<Recipe> addRecipe(@RequestBody Recipe r){
        Recipe newRecipe = recipeRepository.save(r);
        return new ResponseEntity<>(newRecipe,HttpStatus.CREATED);
    }


    @DeleteMapping("/deleteRecipe/{id}")
    public ResponseEntity deleteRecipe(@PathVariable Long id){
        Recipe r=recipeRepository.findById(id).orElse(null);
        if (r==null)
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        recipeRepository.delete(r);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/upload")
        public ResponseEntity<RecipeDTO> uploadImageRecipe(@RequestPart("recipe") String recipeJson,
                                                    @RequestPart("image") MultipartFile image) throws IOException
    {
        ObjectMapper objectMapper=new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        Recipe recipe=objectMapper.readValue(recipeJson,Recipe.class);
        String imageUrl=DIRECTORY_URL+image.getOriginalFilename();
        Path filePath=Paths.get(imageUrl);
        Files.write(filePath,image.getBytes());
        recipe.setImageUrl(image.getOriginalFilename());
        Recipe newRecipe=recipeRepository.save(recipe);
        return new ResponseEntity<>(mapper.recipeToDto(newRecipe),HttpStatus.CREATED);
    }
 

    @GetMapping("getDto/{id}")
    public ResponseEntity<RecipeDTO> getRecipeDto(@PathVariable long id) throws IOException {
        return new ResponseEntity<>(mapper.recipeToDto(recipeRepository.findById(id).orElse(null)),HttpStatus.OK);
    }

    @Transactional
    @DeleteMapping("/deleteRecipeByCategoryId/{categoryId}")
    public ResponseEntity<Void> deleteRecipeByCategoryId(@PathVariable long categoryId) {
        recipeRepository.deleteByCategory_Id(categoryId);
        return ResponseEntity.noContent().build();
    }

    @Transactional
    @DeleteMapping("/deleteRecipeByRecipeBookId/{recipeBookId}")
    public ResponseEntity<Void> deleteByRecipeBook_Id(@PathVariable long recipeBookId) {
        recipeRepository.deleteByRecipeBook_Id(recipeBookId);
        return ResponseEntity.noContent().build();
    }
}
