package com.example.demo.dto;

import com.example.demo.model.Category;
import com.example.demo.model.RecipeBook;

public class RecipeDTO {
    private Long id;

    private String name;

    private String description;

    private String methodOfPreparation;

    private String productAndQuantity;

    private String imageUrl;

    private RecipeBook recipeBook;

    private Category category;

    private byte[] image;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMethodOfPreparation() {
        return methodOfPreparation;
    }

    public void setMethodOfPreparation(String methodOfPreparation) {
        this.methodOfPreparation = methodOfPreparation;
    }

    public String getProductAndQuantity() {
        return productAndQuantity;
    }

    public void setProductAndQuantity(String productAndQuantity) {
        this.productAndQuantity = productAndQuantity;
    }

    public RecipeBook getRecipeBook() {
        return recipeBook;
    }

    public void setRecipeBook(RecipeBook recipeBook) {
        this.recipeBook = recipeBook;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
