import { NavbarProps } from "@/types";
import MenuList from "./MenuList";
import Avatar from "./Avatar";
import LogoIcon from "./LogoIcon";
import Logo from "./Logo";
import Image from "next/image";

export default function Navbar({selection, img_avatar, name_avatar, email_avatar}: NavbarProps) {

  const handleLogout = async () => {
    // Chama a rota de logout
    await fetch('/logout', { method: 'GET' });

    // Limpa o localStorage
    localStorage.removeItem('user');

    // Redireciona para a página de login
    window.location.href = '/'; // Ajuste para a sua rota de login
};

    let dashboard:boolean = false;
    let projetos:boolean = false;
    let fontes_de_energia:boolean = false;

    const dashboard_icon_selecionado:string = "bg-icon-dash-selecionado";
    const dashboard_icon_nao_selecionado:string = "bg-icon-dash-nao-selecionado";
    const projetos_icon_selecionado:string = "bg-icon-project-selecionado";
    const projetos_icon_nao_selecionado:string = "bg-icon-project-nao-selecionado";
    const fontes_de_energia_icon_selecionado:string = "bg-icon-energy_fonts-selecionado";
    const fontes_de_energia_icon_nao_selecionado:string = "bg-icon-energy_fonts-nao-selecionado";

    let dashboard_icon:string = "";
    let projetos_icon:string = "";
    let fontes_de_energia_icon:string = "";

    if (selection == 'dashboard') {
        dashboard = true;
        dashboard_icon = dashboard_icon_selecionado;
        projetos_icon = projetos_icon_nao_selecionado;
        fontes_de_energia_icon = fontes_de_energia_icon_nao_selecionado;
    } else if (selection == 'projetos') {
        projetos = true;
        dashboard_icon = dashboard_icon_nao_selecionado;
        projetos_icon = projetos_icon_selecionado;
        fontes_de_energia_icon = fontes_de_energia_icon_nao_selecionado;
    } else if (selection == 'fontes-de-energia') {
        fontes_de_energia = true;
        dashboard_icon = dashboard_icon_nao_selecionado;
        projetos_icon = projetos_icon_nao_selecionado;
        fontes_de_energia_icon = fontes_de_energia_icon_selecionado;
    }

    return (
        <nav className='h-screen w-72 bg-bg_black_1 border-r-2 border-border_gray relative flex-col justify-start items-start inline-flex'>
        <div className="w-full h-[110px] justify-center items-center gap-2.5 inline-flex">
          <div className='w-[221px] h-20 relative flex flex-row items-center justify-center gap-[10px]'>
            <LogoIcon/>
            <Logo/>
          </div>
        </div>
        <div className='w-full origin-top-left border-t-2 border-border_gray'/>
        <div className="w-full h-[816px] px-8 py-8 flex-col justify-start items-center gap-[30px] inline-flex">
          <div className='flex flex-col gap-5'>
            <MenuList icon={dashboard_icon} select={dashboard} to={'/dashboard'} value={'Dashboard'}/>
            <MenuList icon={projetos_icon} select={projetos} to={'/projects'} value={'Projetos'}/>
            <MenuList icon={fontes_de_energia_icon} select={fontes_de_energia} to={'/energy-fonts'} value={'Fontes de Energia'}/>
            <div className='w-full origin-top-left border-t-2 border-border_gray'/>
            <button type="button" onClick={handleLogout}>
              <MenuList icon={'bg-icon-logout'} select={false} to={'/logout'} value={'Sair'}/>
            </button>
          </div>
        </div>
        <div className='w-full origin-top-left border-t-2 border-border_gray'/>
          <div className="w-full h-[110px] px-[17px] py-[30px] justify-between items-center inline-flex">
            <div className="w-full h-full justify-start items-center gap-[5px] inline-flex">
              <Avatar src={`/${img_avatar}`} name={name_avatar}/>
              <div className="w-[181px] h-[24.23px] relative">
                <p className="w-full absolute text-white text-sm font-bold whitespace-nowrap overflow-hidden text-ellipsis">{name_avatar}</p>
                <p className="w-full top-[14.23px] absolute text-white text-xs font-normal whitespace-nowrap overflow-hidden text-ellipsis">{email_avatar}</p>
              </div>
              <div className="w-[30px] h-[30px] relative">
                <button type="button">
                  <Image src="/icon-config.svg" alt="Configurações" width={30} height={30}/>
                </button>
              </div>
            </div>
          </div>
      </nav>
    );
}
