"use client";

import RecipeCard from "@/components/RecipeCard";
import React, { useEffect, useState } from "react";
import style from "../../styles/page-styles/recipes.module.css";
import { useSearchParams } from "next/navigation";
import Search from "@/components/Search";
import { IRecipe } from "../page";

const page = () => {
  const searchParams = useSearchParams();
  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  useEffect(() => {
    async function search() {
      let res;
      if (searchParams.get("name") !== null) {
        res = await fetch(
          `${process.env.DEV_SERVER}/api/recipes?name=${searchParams.get(
            "name"
          )}`
        );
      } else {
        res = await fetch(`${process.env.DEV_SERVER}/api/recipes`);
      }
      let recipes = await res.json();
      setRecipes(recipes);
    }
    search();
  }, [searchParams.get("name")]);

  return (
    <div className={style.recipes}>
      <h1 className={style.recipesHeader}>Find yourself a dish!</h1>
      <Search route="recipes" placeholder="Search for recipes" />
      <div className={style.recipesList}>
        {recipes?.map((recipe: IRecipe, key: number) => (
          <RecipeCard
            key={key}
            id={recipe.id}
            recipeName={recipe.recipeName}
            description={recipe.description}
            creator={recipe.creator}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
