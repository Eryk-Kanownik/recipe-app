"use client";

import React, { useEffect, useState } from "react";
import { BiStar, BiSolidStar } from "react-icons/bi";
import style from "../styles/component-styles/save.module.css";
import { useSession } from "next-auth/react";

interface ISave {
  recipeId: number;
}

const Save = ({ recipeId }: ISave) => {
  const session = useSession();
  const [isSaved, setIsSaved] = useState();

  useEffect(() => {
    async function getSaved() {
      let res = await fetch(
        `${process.env.DEV_SERVER}/api/recipes/${recipeId}/save/${session.data?.user.id}`
      );
      let saved = await res.json();
      setIsSaved(saved);
    }
    getSaved();
  }, [session.data?.user.id]);

  const onClick = async () => {
    let res = await fetch(
      `${process.env.DEV_SERVER}/api/recipes/${recipeId}/save/${session.data?.user.id}`,
      { method: "POST" }
    );
    let saved = await res.json();
    setIsSaved(saved);
  };

  const icon = isSaved ? <BiSolidStar /> : <BiStar />;

  return (
    <div className={style.save} onClick={() => onClick()}>
      {icon}
    </div>
  );
};

export default Save;
