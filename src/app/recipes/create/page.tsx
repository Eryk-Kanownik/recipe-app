"use client";

import React, { useEffect, useState } from "react";
import style from "../../../styles/page-styles/create-recipe.module.css";
import recipeStyle from "../../../styles/page-styles/recipe.module.css";
import Ingredient from "@/components/Ingredient";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export interface IIngredient {
  index?: number;
  deleteIngredient?: Function;
  ingredientName: string;
  count: number;
  unit: "mililiters" | "kilograms" | "grams" | "pieces" | "spoons" | "liters";
}

export interface IRecipe {
  dishName: string;
  description: string;
  ingredients: IIngredient[];
  preparationMethod: string;
}

const page = () => {
  const router = useRouter();
  const session = useSession();

  const [recipe, setRecipe] = useState<IRecipe>({
    dishName: "",
    description: "",
    ingredients: [],
    preparationMethod: "",
  });

  const [ingredient, setIngredient] = useState<IIngredient>({
    ingredientName: "",
    count: 0,
    unit: "grams",
  });

  useEffect(() => {
    if (session.data?.user) {
      if (localStorage.getItem("recipe") === null) {
        localStorage.setItem("recipe", JSON.stringify(recipe));
      } else {
        let recipe = JSON.parse(localStorage.getItem("recipe")!);
      }
    } else {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("recipe", JSON.stringify(recipe));
  }, [recipe]);

  const onChangeRecipe = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRecipe((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangeIngredient = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setIngredient((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangeIngredientCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredient((prev) => ({
      ...prev,
      count: parseFloat(e.target.value),
    }));
  };

  const addIngredient = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setRecipe((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ingredient],
    }));
    setIngredient({ ingredientName: "", count: 0, unit: "grams" });
  };

  const deleteIngredient = (ingredientIndex: number) => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter(
        (ingredient, index) => index !== ingredientIndex
      ),
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let recipeData = {
      data: {
        recipeName: recipe.dishName,
        description: recipe.description,
        methodOfPreparation: recipe.preparationMethod,
        creator: {
          connect: {
            id: session.data?.user?.id,
          },
        },
        ingredients: {
          create: [...recipe.ingredients],
        },
        saved: {
          connect: {
            id: session!.data!.user!.id!,
          },
        },
      },
    };
    let res = await fetch(`${process.env.DEV_SERVER}/api/recipes`, {
      method: "POST",
      body: JSON.stringify(recipeData),
    });

    let r = await res.json();
    router.push(`/recipes/${r.id}`);
  };

  return (
    <div className={style.createRecipe}>
      <div>
        <form className={style.createRecipeForm} onSubmit={(e) => onSubmit(e)}>
          <h1 className={style.createRecipeFormHeader}>Create Recipe</h1>
          <div className={style.inputBlock}>
            <label>Name the dish</label>
            <input
              type="text"
              name="dishName"
              onChange={(e) => onChangeRecipe(e)}
              value={recipe.dishName}
            />
          </div>
          <div className={style.inputBlock}>
            <label>Description</label>
            <textarea
              name="description"
              onChange={(e) => onChangeRecipe(e)}
              rows={5}
              value={recipe.description}
            ></textarea>
          </div>
          <div className={style.inputBlock}>
            <label>Ingredients</label>
            <div className={style.ingredientBlock}>
              <input
                type="text"
                name="ingredientName"
                value={ingredient.ingredientName}
                onChange={(e) => onChangeIngredient(e)}
              />
              <input
                type="number"
                placeholder="Count"
                value={ingredient.count}
                name="count"
                onChange={(e) => onChangeIngredientCount(e)}
              />
              <select
                name="unit"
                value={ingredient.unit}
                onChange={(e) => onChangeIngredient(e)}
              >
                <option>mililiters</option>
                <option>kilograms</option>
                <option>grams</option>
                <option>pieces</option>
                <option>spoon</option>
                <option>liters</option>
              </select>
              <button onClick={(e) => addIngredient(e)}>Add</button>
            </div>
          </div>
          <div className={style.inputBlock}>
            <label>Preparation Method</label>
            <textarea
              name="preparationMethod"
              onChange={(e) => onChangeRecipe(e)}
              rows={10}
              value={recipe.preparationMethod}
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>

      <div className={style.preview}>
        <div className={style.previewContent}>
          <h1 className={recipeStyle.recipeName}>
            {recipe.dishName === "" ? "Dishname" : recipe.dishName}
          </h1>
          <div className={recipeStyle.recipeDescriptionBlock}>
            <h1 className={recipeStyle.recipeDescriptionHeader}>Description</h1>
            <p className={recipeStyle.recipeDescription}>
              {recipe.description}
            </p>
          </div>

          <div className={recipeStyle.recipeIngredientsBlock}>
            <h1 className={recipeStyle.recipeIngredientsHeader}>Ingredients</h1>
            <ul className={recipeStyle.recipeIngredientsList}>
              {recipe.ingredients.map((ingredient: IIngredient, index) => (
                <Ingredient
                  key={index}
                  index={index}
                  ingredientName={ingredient.ingredientName}
                  count={ingredient.count}
                  unit={ingredient.unit}
                  deleteIngredient={deleteIngredient}
                />
              ))}
            </ul>
          </div>

          <div className={recipeStyle.recipePreparationBlock}>
            <h1 className={recipeStyle.recipePreparationHeader}>
              Preparation Method
            </h1>
            <p className={recipeStyle.recipePreparationDescription}>
              {recipe.preparationMethod}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
