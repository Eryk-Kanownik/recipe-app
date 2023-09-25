"use client";
import React, { useEffect, useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

import style from "../styles/component-styles/like.module.css";
import { useSession } from "next-auth/react";

interface ILike {
  recipeId: number;
}

const Like = ({ recipeId }: ILike) => {
  const session = useSession();

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    async function loadLikes() {
      let res = await fetch(
        `http://localhost:3000/api/recipes/${recipeId}/likes`
      );
      let likes = await res.json();
      setLikes(likes);
    }
    loadLikes();
  }, []);

  useEffect(() => {
    if (likes.length === 0) {
      setLiked(false);
    } else {
      if (
        likes.map((like: any) => like.userId).indexOf(session.data?.user.id) ===
        -1
      ) {
        setLiked(false);
      } else {
        setLiked(true);
      }
    }
  }, [likes]);

  const onClick = async () => {
    let data = { userId: session.data?.user.id };
    let res = await fetch(
      `http://localhost:3000/api/recipes/${recipeId}/likes`,
      { method: "POST", body: JSON.stringify(data) }
    );
    let likes = await res.json();
    setLikes(likes);
  };

  return (
    <div className={style.like}>
      <div className={style.likeIcon} onClick={() => onClick()}>
        {liked ? <AiFillLike /> : <AiOutlineLike />}
      </div>
      <div className={style.likeNumber}>{likes.length}</div>
    </div>
  );
};

export default Like;
