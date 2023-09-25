"use client";
import React, { useEffect, useRef, useState } from "react";
import style from "../../styles/page-styles/login.module.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IForm } from "../register/page";

const page = () => {
  const infoRef = useRef<null | HTMLDivElement>(null);
  const [infoState, setInfoState] = useState<null | string>(null);
  const router = useRouter();
  const [loginForm, setLoginForm] = useState<IForm>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (infoState !== null) {
      if (infoState === "Authentication succesfull!") {
        infoRef.current!.classList.add(`${style.showInfo}`);
        setTimeout(() => {
          infoRef.current!.classList.remove(`${style.showInfo}`);
          setInfoState(null);
        }, 2000);
        setTimeout(() => router.push("/"), 2000);
      } else {
        infoRef.current!.classList.add(`${style.showInfo}`);
        setTimeout(() => {
          infoRef.current!.classList.remove(`${style.showInfo}`);
          setInfoState(null);
        }, 5000);
      }
    }
  }, [infoState]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data = await signIn("credentials", {
      ...loginForm,
      redirect: false,
    });
    if (data?.error) {
      setInfoState(data!.error);
    } else {
      setInfoState("Authentication succesfull!");
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className={style.login}>
      <form
        className={style.loginForm}
        onSubmit={(e) => onSubmit(e)}
        method="POST"
      >
        <h1>Login</h1>
        <div className={style.inputBlock}>
          <label htmlFor="email" className={style.label}>
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email..."
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className={style.inputBlock}>
          <label htmlFor="password" className={style.label}>
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password..."
            onChange={(e) => onChange(e)}
          />
        </div>

        <button className={style.btnSubmit}>Login</button>
      </form>
      <div ref={infoRef} className={style.info}>
        <h3>{infoState}</h3>
      </div>
    </div>
  );
};

export default page;
