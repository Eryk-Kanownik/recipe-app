"use client";

import React from "react";
import style from "../styles/page-styles/user.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface IChoice {
  userId: number | string;
}

const Choice = ({ userId }: IChoice) => {
  const session = useSession();
  return (
    <div className={style.userChoice}>
      <Link
        className={style.userChoiceLink}
        href={`/users/${userId}?choice=created`}
      >
        Users Recipes
      </Link>
      {session.data?.user.id === userId ? (
        <Link
          className={style.userChoiceLink}
          href={`/users/${userId}?choice=saved`}
        >
          Saved
        </Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default Choice;
