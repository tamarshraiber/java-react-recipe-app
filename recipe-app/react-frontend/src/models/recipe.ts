import { Category } from "./category";
import { RecipeBook } from "./recipeBook";

export interface Recipe{
    id:number,
    name:string,
    description:string,
    methodOfPreparation:string,
    productAndQuantity:string,
    recipeBook:RecipeBook,
    category:Category,
    image?:string,
    imageUrl?:string,
}