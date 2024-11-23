"use client";
import Logo from "@/components/Globais/Logo";
import Header from "@/components/Header/Header";
import Link from "next/link";
import { useEffect } from "react";

export default function NotFound(){

    useEffect(() => {
        document.title = "EcoVance · Página não Encontrada";
      }, []);
    
    return (
      <Header>
        <main className="flex flex-row justify-center items-center">
        <section className="w-[328px] h-full rounded-[30px] border-[2px] border-color_6 bg-color_2">
          <div className="w-full h-full inline-flex flex-col items-center p-4 gap-4">
            <Logo/>
            <div className="w-72 h-full flex flex-col items-center gap-4">
              <h1 className="font-normal leading-normal text-white text-2xl">Ops!</h1>
              <p className="font-normal leading-normal text-white text-lg text-center">Infelizmente a página que você tentou acessar não existe.</p>
              <Link className="flex items-center justify-center gap-2.5 h-11 px-11 rounded-full border-2 border-color_6 bg-color_3 shadow-button font-semibold text-white cursor-pointer" href={"/dashboard"}>Voltar à página inicial</Link>
            </div>
          </div>
        </section>
        </main>
      </Header>
    );
}