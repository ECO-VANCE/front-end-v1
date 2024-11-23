export type HeaderProps = {
    children: React.ReactNode;
}

export type MenuListProps = {
    icon: string;
    select: boolean;
    to: string;
    value: string;
}
export type AvatarProps = {
    src: string;
    name: string;
}

export type NavbarProps = {
    selection: "dashboard" | "projetos" | "fontes-de-energia";
    img_avatar: string;
    name_avatar: string;
    email_avatar: string;
}

export type ProjectsData = {
    descricao: string;
    idProjeto: number;
    localizacao: string;
    nome: string;
    tipoEnergia: string;
}

export type MonitoramentoProjectsData = {
    dataMonitoramento: string
    geracaoAtual: number;
    idMonitoramento: number;
    idProjeto: number;
    status: string;
    tipoEnergia: string;
}

export type ListaPrevisaoData = {
    dataPrevisao: string;
    geracaoPrevisao: number;
    idPrevisao: number;
    idProjeto: number;
    intensidadePrevisao: string;
    tipoEnergia: string;
}

export type AtividadesData = {
    dataFim: string;
    dataInicio: string;
    descricao: string;
    idAtividade: number;
    id_projeto: number;
    nome: string;
    responsavel: string;
}

export type PrevisaoData = {
    dataPrevisao: string;
    geracaoPrevisao: number;
    idPrevisao: number;
    idProjeto: number;
    intensidadePrevisao: string;
    tipoEnergia: string;
}

export type InputProps = {
    classname?: string;
    type: string;
    name: string;
    id: string;
    placeholder?: string;
    minlength?: number;
    maxlength?: number;
    required?: boolean;
    icon?: string;
    onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?:string | number;
    disabled?: boolean;
}

export type CheckmarkProps = {
    name: string;
    id: string;
    required?: boolean;
    value: string | "Valor não definido";
}