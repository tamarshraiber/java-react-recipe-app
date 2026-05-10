package com.example.demo.controller;

import com.example.demo.model.Category;
import com.example.demo.servies.CategoryRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/category")
@CrossOrigin
public class CategoryController {
    private CategoryRepository categoryRepository;
    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getCategories() {
        return new ResponseEntity<>(categoryRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/getCategoriesById/{id}")
    public ResponseEntity<Category> getCategoriesById(@PathVariable Long id) {
        try{
            Category c=categoryRepository.findById(id).orElse(null);
            return new ResponseEntity<>(c,HttpStatus.OK);
        }   catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

//        if(c==null)
//            return new ResponseEntity<>(c,HttpStatus.NOT_FOUND);

    }

    @PostMapping("/addCategory")
    public ResponseEntity<Category> addCategory(@RequestBody Category category){
        Category c=categoryRepository.save(category);
        return new ResponseEntity<>(c,HttpStatus.CREATED);
    }



    @PutMapping("/updateCategory/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category category){
        Category c=categoryRepository.findById(id).orElse(null);
        if (c==null){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        c=categoryRepository.save(category);
        return new ResponseEntity<>(c,HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/Category/{id}")
    public ResponseEntity deleteCategory(@PathVariable Long id){
        Category c=categoryRepository.findById(id).orElse(null);
        if(c==null)
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        categoryRepository.delete(c);
        return new ResponseEntity<>(c,HttpStatus.NO_CONTENT);
    }

    @Transactional
    @DeleteMapping("/deleteCategoryByRecipeBookId/{recipeBookId}")
    public ResponseEntity<Void> deleteByRecipeBook_Id(@PathVariable long recipeBookId) {
        categoryRepository.deleteByRecipeBook_Id(recipeBookId);
        return ResponseEntity.noContent().build();
    }

}
