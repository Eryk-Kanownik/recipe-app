import React from "react";
import style from "../../../styles/page-styles/user.module.css";
import RecipeCard from "@/components/RecipeCard";
import { getServerSession } from "next-auth";
import { OPTIONS } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Choice from "@/components/Choice";
import { IRecipe } from "@/app/page";

async function getUserData(id: string) {
  let res = await fetch(`${process.env.DEV_SERVER}/api/users/${id}`, {
    next: {
      revalidate: 1,
    },
  });
  let user = await res.json();
  return user;
}

const page = async ({
  params: { index },
  searchParams: { choice },
}: {
  params: { index: string };
  searchParams: { choice: string };
}) => {
  let session = await getServerSession(OPTIONS);
  if (session === null) {
    redirect("/login");
  }
  let userData = await getUserData(index);

  const recipes =
    choice === "saved"
      ? userData.Saved.map((recipe: any, key: number) => (
          <RecipeCard
            key={key}
            id={recipe.recipe.id}
            recipeName={recipe.recipe.recipeName}
            description={recipe.recipe.description}
            creator={{ id: userData.id, username: userData.username }}
          />
        ))
      : userData.userRecipes.map((recipe: IRecipe, key: number) => (
          <RecipeCard
            key={key}
            id={recipe.id}
            recipeName={recipe.recipeName}
            description={recipe.description}
            creator={{ id: userData.id, username: userData.username }}
          />
        ));

  return (
    <div className={style.user}>
      <h1 className={style.userHeader}>{userData!.username}</h1>

      <Choice userId={userData.id} />
      <div className={style.userRecipes}>{recipes}</div>
    </div>
  );
};

export default page;
