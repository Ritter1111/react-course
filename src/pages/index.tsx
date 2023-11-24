import { Inter } from "next/font/google";
import router from "next/router";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useEffect(() => {
    router.push("/page/1");
  });
  return (
    <>
      <main className={`${inter.className}`}></main>
    </>
  );
}
