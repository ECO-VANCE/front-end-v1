"use client";
import Navbar from '@/components/Globais/Navbar';
import { ListaPrevisaoData, MonitoramentoProjectsData, ProjectsData } from '@/types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {

  const [listaProjects, setListaProjects] = useState<ProjectsData[]>([]);
  const [listaMonitoramento, setListaMonitoramento] = useState<MonitoramentoProjectsData[]>([]);
  const [listaPrevisao, setListaPrevisao] = useState<ListaPrevisaoData[]>([]);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    document.title = "EcoVance · Dashboard";

    const chamadaAPI = async () => {
      if (isFetched) return;

      try {
        const [projetosResponse, monitoramentoResponse, previsaoResponse] = await Promise.all([
          fetch('http://localhost:8080/ecovance/'),
          fetch('http://localhost:8080/ecovance/monitoramento'),
          fetch('http://localhost:8080/ecovance/previsao'),
        ]);


        const projetosData = await projetosResponse.json();
        const monitoramentoData = await monitoramentoResponse.json();
        const previsaoData = await previsaoResponse.json();

        setListaProjects(projetosData);
        setListaMonitoramento(monitoramentoData);
        setListaPrevisao(previsaoData);

        setIsFetched(true);
      } catch (error) {
        console.error("Erro ao chamar a API: ", error);
      }
    };
    chamadaAPI();
  }, [isFetched]);

  // Associa o nome do projeto ao idProjeto
  const projetoNomeMap = listaProjects.reduce((acc, projeto) => {
    acc[projeto.idProjeto] = projeto.nome;
    return acc;
  }, {} as Record<number, string>);

  // Organiza os dados para o gráfico de linha
  const labels = listaMonitoramento.map((monitoramento) => {
    // Extraímos a data da string e formatamos corretamente
    const dateString = monitoramento.dataMonitoramento;
    const date = new Date(dateString + 'T00:00:00'); // Define a hora para evitar problemas de fuso horário
    
    // Formatação para "DD/MM/YYYY"
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // mês começa em 0
    const year = date.getFullYear();
    
    // Retorna a data formatada
    return `${day}/${month}/${year}`;
  });
  
  const geracaoAtualData = listaMonitoramento.reduce((acc, monitoramento) => {
    const { idProjeto, geracaoAtual } = monitoramento;
    if (!acc[idProjeto]) {
      acc[idProjeto] = [];
    }
    acc[idProjeto].push(geracaoAtual);
    return acc;
  }, {} as Record<number, number[]>);

  // Prepara os datasets para cada projeto
  const datasets = Object.keys(geracaoAtualData).map((idProjeto) => {
    return {
      label: projetoNomeMap[Number(idProjeto)] || `Projeto ${idProjeto}`,
      data: geracaoAtualData[Number(idProjeto)],
      fill: false,
      borderColor: 'rgba(54, 162, 235, 1)',
      tension: 0.1,
    };
  });

  const data = {
    labels: labels, // Labels (Projetos)
    datasets: datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Geração Atual por Projeto',
      },
    },
  };

  // ======================

  const labels_2 = listaPrevisao.map((previsao) => {
    const dateString = previsao.dataPrevisao;
    const date = new Date(dateString + 'T00:00:00');
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  });

  const previsaoData = listaPrevisao.reduce((acc, previsao) => {
    const { idProjeto, geracaoPrevisao, tipoEnergia } = previsao;
    
    if (!acc[idProjeto]) {
      acc[idProjeto] = {
        solar: [],
        eolica: [],
      };
    }
    
    if (tipoEnergia === 'solar') {
      acc[idProjeto].solar.push(geracaoPrevisao);
    } else if (tipoEnergia === 'eólica') {
      acc[idProjeto].eolica.push(geracaoPrevisao);
    }
    
    return acc;
  }, {} as Record<number, { solar: number[], eolica: number[] }>);
  
  const datasets_2 = Object.keys(previsaoData).map((idProjeto) => {
    const idProjetoNumber = Number(idProjeto);  // Convertendo a chave de string para número
    // Verificando se o projeto existe no mapeamento de projetos

  
    // Criando os datasets para Solar e Eólica para cada projeto
    return [
      {
        label: projetoNomeMap[Number(idProjeto)] || `Projeto ${idProjeto} - Solar`,  // Exibindo o nome do projeto para Solar
        data: previsaoData[idProjetoNumber].solar,
        fill: false,
        borderColor: 'rgba(255, 205, 86, 1)', // Cor para Solar
        tension: 0.1,
      },
      {
        label: projetoNomeMap[Number(idProjeto)] || `Projeto ${idProjeto} - Eólica`,  // Exibindo o nome do projeto para Eólica
        data: previsaoData[idProjetoNumber].eolica,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)', // Cor para Eólica
        tension: 0.1,
      },
    ];
  }).flat(); // Usando flat() para achatar o array de arrays
  
  // Agora a variável datasets_2 está com o nome correto do projeto sendo exibido nos labels.
  

  const data_2 = {
    labels: labels_2, // Labels com datas formatadas
    datasets: datasets_2,
  };

  const options_2 = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Previsões de Geração de Energia',
      },
    },
  };


  return (
    <div className='bg-bg_black_2 flex flex-row w-screen h-screen'> 
      <Navbar selection={'dashboard'} img_avatar={'avatar.png'} name_avatar={'Pedro Henrique Vasco Antonieti'} email_avatar={'pedro.antonieti@gmail.com'} />
      <div className='w-full h-full p-[30px] flex flex-col gap-[30px]'>
        <div className='flex flex-row justify-between'>
          <div className='flex items-center'>
            <h1 className='text-white text-2xl font-bold'>Dashboard</h1>
          </div>
          <div className="w-auto h-10 flex flex-row items-center gap-[10px]">
            <Image src="/icon-location.svg" alt="location" width={40} height={40} />
            <div className="relative text-white text-base font-bold">São Gonçalo do Gurguéia, PI</div>
          </div>
        </div>
        <div className='grid grid-cols-1 text-white gap-5'>
          <div className='item-1'>
            <h2 className='text-left font-bold text-xl' id='qtd-projetos'>Projetos</h2>
            <table className='text-sm border-collapse'>
              <thead className='bg-color_1 text-gray-300 border-b-2 border-color_2 font-bold text-center'>
                <tr>
                  <th className='p-2'>Nome do Projeto</th>
                  <th className='p-2'>Descrição</th>
                  <th className='p-2'>Localização</th>
                  <th className='p-2'>Tipo de Energia</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-color_2 text-center'>
                {Array.isArray(listaProjects) && listaProjects.length > 0 ? (
                  listaProjects.map((pj) => (
                    <tr key={pj.idProjeto}>
                      <td className='p-2'>{pj.nome}</td>
                      <td className='p-2'>{pj.descricao}</td>
                      <td className='p-2'>{pj.localizacao}</td>
                      <td className='p-2'>{pj.tipoEnergia}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className='p-2'>Nenhum dado encontrado.</td>
                  </tr>
                )}
              </tbody>
              <tfoot className=' text-gray-400 border-t-2 border-color_2 font-bold'>
                <tr>
                  <td colSpan={5} className='p-2 col-span-5'>{listaProjects.length === 0 ? '' : `Exibindo ${listaProjects.length} Projeto${listaProjects.length > 1 ? 's' : ''}.`}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div className="grid grid-cols-2 text-white gap-5">
          <div className='item-2'>
            <h2 className='text-left font-bold text-xl' id='qtd-projetos'>Monitoramento de Produção</h2>
            <div className=" p-5 rounded-lg shadow-md mx-auto">
              <Line data={data} options={options} />
            </div>
          </div>
          <div className='item-3'>
            <h2 className='text-left font-bold text-xl'>Previsão de Geração de Energia</h2>
              <div className=" p-5 rounded-lg shadow-md mx-auto">
                <Line data={data_2} options={options_2} />
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}
