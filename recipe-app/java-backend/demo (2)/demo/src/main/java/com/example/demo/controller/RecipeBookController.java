package com.example.demo.controller;

import com.example.demo.model.RecipeBook;
import com.example.demo.model.User;
//import com.example.demo.servies.RecipeRepository;
import com.example.demo.servies.RecipeBookRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/recipe_book")
@CrossOrigin
public class RecipeBookController {
       private RecipeBookRepository recipe_Book_Repository;

       public RecipeBookController(RecipeBookRepository recipe_Book_Repository) {
           this.recipe_Book_Repository = recipe_Book_Repository;
       }

       @GetMapping("/recipe_books")
       public ResponseEntity<List<RecipeBook>> getAllRecipeBooks() {
           return new ResponseEntity<>(recipe_Book_Repository.findAll(), HttpStatus.OK);
       }

        @GetMapping("/getRecipe_BookById/{id}")
        public ResponseEntity<RecipeBook> getRecipeBookById(@PathVariable Long id) {
           RecipeBook rc=recipe_Book_Repository.findById(id).orElse(null);
           if(rc==null) {
               return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
           }
           return new ResponseEntity<>(rc,HttpStatus.OK);
        }

       @PutMapping("/updaetRecipe_Book/{id}")
       public ResponseEntity<RecipeBook> updateRecipeBook(@PathVariable Long id,
                                                          @RequestBody RecipeBook recipeBook) {
           RecipeBook rc=recipe_Book_Repository.findById(id).orElse(null);
           if(rc==null) {
               return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
           }
           rc.setName(recipeBook.getName());
           rc.setRecipes(recipeBook.getRecipes());
           rc=recipe_Book_Repository.save(rc);
           return new ResponseEntity<>(rc,HttpStatus.CREATED);

       }

       @PostMapping("/addRecipe_Book")
       public ResponseEntity<RecipeBook> addRecipeBook(@RequestBody RecipeBook recipeBook) {
           RecipeBook rc=recipe_Book_Repository.save(recipeBook);
           return new ResponseEntity<>(rc,HttpStatus.CREATED);
       }

    @DeleteMapping("/deleteRecipe_Book/{id}")
    public ResponseEntity deleteRecipeBook(@PathVariable Long id) {
           RecipeBook rc=recipe_Book_Repository.findById(id).orElse(null);
           if(rc==null) {
               return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
           }
           recipe_Book_Repository.delete(rc);
           return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/getBooksByUserId")
    public ResponseEntity<List<RecipeBook>> getBooksByUserId(@RequestBody User user){
           List<RecipeBook> books=recipe_Book_Repository.findAllByUser(user);
           return new ResponseEntity<>(books,HttpStatus.OK);
    }

    @GetMapping("/getRecipeBooksByUserId/{userId}")
    public ResponseEntity<List<RecipeBook>> getRecipeBooksByUserId(@PathVariable Long userId) {
        List<RecipeBook> recipeBooks = recipe_Book_Repository.findByUserId(userId);
        return ResponseEntity.ok(recipeBooks);
    }



}
