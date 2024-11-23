"use client";
import Header from "@/components/Header/Header";
import Logo from "@/components/Globais/Logo";
import Input from "@/components/Globais/Input";
import Checkmark from "@/components/Globais/Checkmark";
import Link from "next/link";
import { useEffect } from "react";

export default function Login() {

  useEffect(() => {
    document.title = " - Login";
  }, []);

  return (
    <Header>
      <main className="flex flex-row justify-center items-center">
        <section className="w-[328px] h-full rounded-[30px] border-[2px] border-color_6 bg-color_2">
          <div className="w-full h-full inline-flex flex-col items-center p-4 gap-4">
            <Logo />
            <div className="w-72 h-full flex flex-col items-center gap-4">
              <form
                className="w-72 h-full flex flex-col items-center gap-3"
              >
                <Input
                  icon="bg-icon-email"
                  classname="w-72 h-12 p-3 pl-10 font-normal text-sm box-border rounded-full border-2 border-white bg-color_3 focus:outline-color_9 drop-shadow-row placeholder-color_9 text-black"
                  type="email"
                  placeholder="E-mail"
                  name="txtEmail"
                  id="email"
                  value="admin@admin.com"
                  disabled
                />
                <Input
                  icon="bg-icon-password"
                  classname="w-72 h-12 p-3 pl-10 font-normal text-sm box-border rounded-full border-2 border-color_7 bg-white focus:outline-color_9 drop-shadow-row placeholder-color_9 text-black"
                  type="password"
                  placeholder="Senha"
                  name="txtSenha"
                  id="senha"
                  value="123456789"
                  minlength={8}
                  maxlength={16}
                  disabled
                />
                <Checkmark
                  name="forgot-password"
                  id="forgot-password"
                  required={false}
                  value="Lembrar senha"
                />
                <Link href="/dashboard"
                  className="flex items-center justify-center gap-2.5 h-11 px-11 rounded-full border-2 border-border_gray bg-border_gray shadow-button font-semibold text-white cursor-pointer"
                  id="button-submit"
                  type="submit"
                >
                  Entrar
                </Link>
              </form>
            </div>
          </div>
        </section>
      </main>
    </Header>
  );
}
