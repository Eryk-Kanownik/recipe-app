"use client";
import React, { useEffect, useState } from "react";

import recipesStyle from "../../styles/page-styles/recipes.module.css";
import style from "../../styles/page-styles/users.module.css";

import UserCard from "@/components/UserCard";
import { redirect, useSearchParams } from "next/navigation";
import { getServerSession } from "next-auth";
import { OPTIONS } from "../api/auth/[...nextauth]/route";
import Search from "@/components/Search";
import { useRouter } from "next/router";

async function getUsers() {
  let res = await fetch("http://localhost:3000/api/users", {
    next: { revalidate: 0 },
  });
  let users = await res.json();
  return users;
}

const page = () => {
  const searchParams = useSearchParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function search() {
      let res;
      if (searchParams.get("name") !== null) {
        res = await fetch(
          `${process.env.DEV_SERVER}/api/users?name=${searchParams.get("name")}`
        );
      } else {
        res = await fetch(`${process.env.DEV_SERVER}/api/users`);
      }
      let recipes = await res.json();
      setUsers(recipes);
    }
    search();
  }, [searchParams.get("name")]);

  return (
    <div className={recipesStyle.recipes}>
      <h1 className={recipesStyle.recipesHeader}>Search for users!</h1>
      <Search route="users" placeholder="Search for users" />
      <div className={recipesStyle.recipesList}>
        {users.map(
          (user: {
            id: number;
            username: string;
            userRecipes: Array<object>;
          }) => (
            <UserCard
              id={user.id}
              username={user.username}
              recipes={user.userRecipes}
              likes={user.userRecipes}
            />
          )
        )}
      </div>
    </div>
  );
};

export default page;
