import React, { Suspense } from "react";
import style from "../styles/component-styles/recipe-card.module.css";
import Link from "next/link";
import Like from "./Like";
import Save from "./Save";

interface IRecipeCard {
  id: number;
  recipeName: string;
  description: string;
  creator: {
    id: number;
    username?: string;
  };
}

const RecipeCard: React.FC<IRecipeCard> = ({
  id,
  recipeName,
  description,
  creator,
}) => {
  return (
    <div className={style.recipeCard}>
      <div className={style.recipeHeader}>
        <Link href={`/recipes/${id}`}>
          <h1>{recipeName}</h1>{" "}
        </Link>
        <Save recipeId={id} />
      </div>
      <Link href={`/users/${creator.id}`}>
        <h3 className={style.recipeAuthor}>{creator.username}</h3>
      </Link>
      <Link href={`/recipes/${id}`}>
        <div className={style.recipeDescription}>{description}</div>
      </Link>
      <Like recipeId={id} />
    </div>
  );
};

export default RecipeCard;
