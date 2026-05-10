import { Recipe } from "./recipe";
import { RecipeBook } from "./recipeBook";

export interface Category{
    id:number,
    name:string,
    recipeBook:RecipeBook,
    recipes:Recipe[],
}