import React from "react";
import style from "../styles/component-styles/user-card.module.css";
import Link from "next/link";

interface IUserCard {
  id: number;
  username: string;
  recipes: Array<Object>;
  likes: any;
}

const countLikes = (userLikes: Array<Object>) => {
  let sum = 0;
  userLikes.forEach((like: any) => (sum += like.likes.length));
  return sum;
};

const UserCard = ({ id, username, recipes, likes }: IUserCard) => {
  return (
    <Link href={`/users/${id}`} className={style.userCard}>
      <h2>{username}</h2>
      <p>Likes: {countLikes(likes)}</p>
      <p>Recipes: {recipes.length}</p>
    </Link>
  );
};

export default UserCard;
