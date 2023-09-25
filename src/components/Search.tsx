"use client";
import React, { useState } from "react";
import style from "../styles/page-styles/recipes.module.css";
import { useRouter } from "next/navigation";

interface ISearch {
  route: string;
  placeholder: string;
}

const Search = ({ route, placeholder }: ISearch) => {
  const router = useRouter();
  const [phrase, setPhrase] = useState<string>("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhrase(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/${route}?name=${phrase}`);
    router.refresh();
  };

  return (
    <form className={style.recipesSearchBarForm} onSubmit={(e) => onSubmit(e)}>
      <input
        type="text"
        className={style.recipesSearchBar}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
      />
      <button className={style.recipesSearchBarButton}>Search</button>
    </form>
  );
};

export default Search;
