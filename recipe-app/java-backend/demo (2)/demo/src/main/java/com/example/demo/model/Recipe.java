package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name="Recipies")
public class Recipe {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private String description;

    private String imageUrl;

    @Column(name = "method_of_preparation")
    private String methodOfPreparation;

    private String productAndQuantity;

    @ManyToOne
    private RecipeBook recipeBook;

    @ManyToOne
    private Category category;


    public Recipe() {
    }

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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
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
}