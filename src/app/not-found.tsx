"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const notFound = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, []);

  return <div>not-found</div>;
};

export default notFound;
