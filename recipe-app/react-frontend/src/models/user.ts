import { RecipeBook } from "./recipeBook";

export interface User{
    id:number,
    // firstName:string,
    // lastName:string,
    lastName:string,
    password:string,
    email:string,
    recipeBooks:RecipeBook[],
}