import React from "react";
import style from "../../../styles/page-styles/recipe.module.css";
import Link from "next/link";
import Save from "@/components/Save";
import Like from "@/components/Like";

export interface IIngredient {
  count: number;
  unit: string;
  ingredientName: string;
}

async function getRecipe(id: string) {
  let res = await fetch(`${process.env.DEV_SERVER}/api/recipes/${id}`);
  let recipe = await res.json();
  return recipe;
}

const page = async ({ params: { index } }: { params: { index: string } }) => {
  let recipe = await getRecipe(index);
  return (
    <div className={style.recipe}>
      <h1 className={style.recipeName}>{recipe.recipeName}</h1>
      <Link href={`/users/${recipe.creator.id}`}>
        <h3 className={style.recipeCreator}>
          By:{" "}
          <span className={style.recipeCreatorName}>
            {recipe.creator.username}
          </span>
        </h3>
      </Link>

      <div className={style.recipeDescriptionBlock}>
        <h1 className={style.recipeDescriptionHeader}>Description</h1>
        <p className={style.recipeDescription}>{recipe.description}</p>
      </div>

      <div className={style.wrapper}>
        <div className={style.recipeIngredientsBlock}>
          <h1 className={style.recipeIngredientsHeader}>Ingredients</h1>
          <ul className={style.recipeIngredientsList}>
            {recipe.ingredients.map(
              (ingredient: IIngredient, key: React.Key) => (
                <li key={key} className={style.recipeIngredientsListItem}>
                  {`${ingredient.ingredientName} - ${ingredient.count} ${ingredient.unit}`}
                </li>
              )
            )}
          </ul>
        </div>
        <div className={style.recipePreparationBlock}>
          <h1 className={style.recipePreparationHeader}>Preparation Method</h1>
          <p className={style.recipePreparationDescription}>
            {recipe.methodOfPreparation}
          </p>
        </div>
      </div>

      <div className={style.recipeButtons}>
        <Save recipeId={recipe.id} />
        <Like recipeId={recipe.id} />
      </div>
    </div>
  );
};

export default page;
