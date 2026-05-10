import { Category } from "./category";
import { Recipe } from "./recipe";
import { User } from "./user";

export interface RecipeBook{
    id:number,
    name:string,
    categories:Category[],
    recipes:Recipe[],
    creator:User,
}