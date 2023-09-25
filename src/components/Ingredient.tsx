import { IIngredient } from "@/app/recipes/create/page";
import React from "react";

import style from "../styles/component-styles/ingredient.module.css";

const Ingredient: React.FC<IIngredient> = ({
  ingredientName,
  count,
  unit,
  index,
  deleteIngredient,
}) => {
  return (
    <li className={style.ingredient}>
      {`${ingredientName} - ${count} ${unit}`}{" "}
      <button
        className={style.ingredientDelete}
        onClick={() => deleteIngredient!(index)}
      >
        &times;
      </button>
    </li>
  );
};

export default Ingredient;
