"use client";
import React, { useEffect, useRef, useState } from "react";
import style from "../../styles/page-styles/register.module.css";

export interface IForm {
  username?: string;
  email: string;
  password: string;
}

const page = () => {
  const infoRef = useRef<null | HTMLDivElement>(null);
  const [infoState, setInfoState] = useState<null | string>(null);
  const [userData, setUserData] = useState<IForm>({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (infoState !== null) {
      infoRef.current!.classList.add(`${style.showInfo}`);
      setTimeout(() => {
        infoRef.current!.classList.remove(`${style.showInfo}`);
        setInfoState(null);
      }, 5000);
    }
  }, [infoState]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let res = await fetch(`${process.env.DEV_SERVER}/api/register`, {
      method: "POST",
      body: JSON.stringify(userData),
    });
    let data = await res.json();
    setInfoState(data.message);
  };

  return (
    <div className={style.register}>
      <form
        className={style.registerForm}
        onSubmit={(e) => onSubmit(e)}
        method="POST"
      >
        <h1>Register</h1>
        <div className={style.inputBlock}>
          <label htmlFor="username" className={style.label}>
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={(e) => onChange(e)}
            placeholder="Username..."
          />
        </div>
        <div className={style.inputBlock}>
          <label htmlFor="email" className={style.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => onChange(e)}
            placeholder="Username..."
          />
        </div>
        <div className={style.inputBlock}>
          <label htmlFor="password" className={style.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => onChange(e)}
            placeholder="Password..."
          />
        </div>

        <button className={style.btnSubmit}>Register</button>
      </form>

      <div ref={infoRef} className={style.info}>
        <h3>{infoState}</h3>
      </div>
    </div>
  );
};

export default page;
