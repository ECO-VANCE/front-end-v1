"use client";
import Navbar from '@/components/Globais/Navbar';
import { AtividadesData, PrevisaoData } from '@/types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

export default function EnergyFonts() {

    const [listaAtividades, setAtividades] = useState<AtividadesData[]>([]);
    const [listaPrevisao, setPrevisao] = useState<PrevisaoData[]>([]);

    const [isAddModalAtividadeOpen, setIsAddModalAtividadeOpen] = useState(false);
    const [isEdditModalOpenAtividade, setIsEdditModalOpenAtividade] = useState(false);
    const [atividadeToEdit, setAtividadeToEdit] = useState<AtividadesData | null>(null);
    const [selectedAtividadeId, setSelectedAtividadeId] = useState<number | null>(null);
    const [isModalDeleteAtividadeOpen, setIsModalDeleteAtividadeOpen] = useState(false);
    const [successMessageAtividade, setSuccessMessageAtividade] = useState<string>('');
    const [newAtividade, setNewAtividade] = useState({
      dataFim: '',
      dataInicio: '',
      descricao: '',
      idAtividade: 0, // ou null, dependendo do tipo de dado e se o valor inicial é opcional
      id_projeto: 0, // ou null
      nome: '',
      responsavel: '',
    });


    const [isAddModalPrevisaoOpen, setIsAddModalPrevisaoOpen] = useState(false);
    const [isEdditModalOpenPrevisao, setIsEdditModalOpenPrevisao] = useState(false);
    const [previsaoToEdit, setPrevisaoToEdit] = useState<PrevisaoData | null>(null);
    const [selectedPrevisaoId, setSelectedPrevisaoId] = useState<number | null>(null);
    const [isModalDeletePrevisaoOpen, setIsModalDeletePrevisaoOpen] = useState(false);
    const [successMessagePrevisao, setSuccessMessagePrevisao] = useState<string>('');
    const [newPrevisao, setNewPrevisao] = useState({
      dataPrevisao: '',
      geracaoPrevisao: 0,
      idPrevisao: 0, // ou null, dependendo do tipo de dado e se o valor inicial é opcional
      idProjeto: 0, // ou null
      intensidadePrevisao: '',
      tipoEnergia: '',
    });



    const [isFetched, setIsFetched] = useState(false);

    

  useEffect(() => {
    document.title = "EcoVance · Fontes de Energia";

    const chamadaAPI = async () => {
      if (isFetched) return;

      try {
        const [atividadeResponse, previsaoResponse] = await Promise.all([
          fetch('http://localhost:8080/ecovance/atividade'),
          fetch('http://localhost:8080/ecovance/previsao')
        ]);

        const atividadeData = await atividadeResponse.json();
        const previsaoData = await previsaoResponse.json();

        setAtividades(atividadeData);
        setPrevisao(previsaoData);

        setIsFetched(true);
      } catch (error) {
        console.error("Erro ao chamar a API: ", error);
      }
    
    };
    chamadaAPI();
  }, [isFetched]);

  const openEditAtividadeModal = (project: AtividadesData) => {
    setAtividadeToEdit(project);
    setNewAtividade({
      dataFim: project.dataFim,
      dataInicio: project.dataInicio,
      descricao: project.descricao,
      idAtividade: project.idAtividade,
      id_projeto: project.id_projeto,
      nome: project.nome,
      responsavel: project.responsavel,
    });
    setIsEdditModalOpenAtividade(true);
  };

  const openEditPrevisaoModal = (project: PrevisaoData) => {
    setPrevisaoToEdit(project);
    setNewPrevisao({
      dataPrevisao: project.dataPrevisao,
      geracaoPrevisao: project.geracaoPrevisao,
      idPrevisao: project.idPrevisao, // ou null, dependendo do tipo de dado e se o valor inicial é opcional
      idProjeto: project.idProjeto, // ou null
      intensidadePrevisao: project.intensidadePrevisao,
      tipoEnergia: project.tipoEnergia,
    });
    setIsEdditModalOpenPrevisao(true);
  };

  const openAddAtividadeModal = () => {
    setIsAddModalAtividadeOpen(true);
  };

  const openAddPrevisaoModal = () => {
    setIsAddModalPrevisaoOpen(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewAtividade((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const closeEditModalAtividade = () => {
    setAtividadeToEdit(null);
    setIsEdditModalOpenAtividade(false);
    setNewAtividade({
      dataFim: '',
      dataInicio: '',
      descricao: '',
      idAtividade: 0, // ou null, dependendo do tipo de dado e se o valor inicial é opcional
      id_projeto: 0, // ou null
      nome: '',
      responsavel: '',
    });
  };

  const closeEditModalPrevisao = () => {
    setPrevisaoToEdit(null);
    setIsEdditModalOpenPrevisao(false);
    setNewPrevisao({
      dataPrevisao: '',
      geracaoPrevisao: 0,
      idPrevisao: 0, // ou null, dependendo do tipo de dado e se o valor inicial é opcional
      idProjeto: 0, // ou null
      intensidadePrevisao: '',
      tipoEnergia: '',
    });
  };

  const openDeleteModalAtividade = (idAtividade: number) => {
    setSelectedAtividadeId(idAtividade);
    setIsModalDeleteAtividadeOpen(true);
  };

  const closeDeleteModalAtividade = () => {
    setIsModalDeleteAtividadeOpen(false);
    setSelectedAtividadeId(null);
  };

  const openDeleteModalPrevisao = (idPrevisao: number) => {
    setSelectedPrevisaoId(idPrevisao);
    setIsModalDeletePrevisaoOpen(true);
  };

  const closeDeleteModalPrevisao = () => {
    setIsModalDeletePrevisaoOpen(false);
    setSelectedPrevisaoId(null);
  };

  const handleEditAtividade = async () => {
    if (!atividadeToEdit) return;

    try {
      const response = await fetch(`http://localhost:8080/ecovance/atividade/${atividadeToEdit.idAtividade}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAtividade),
      });

      if (response.ok) {
        const updatedAtividade = await response.json();
        setAtividades((prevProjects) =>
          prevProjects.map((project) =>
            project.idAtividade === updatedAtividade.idAtividade ? updatedAtividade : project
          )
        );
        setSuccessMessageAtividade('Atividade atualizado com sucesso!');
        closeEditModalAtividade();

        setTimeout(() => {
          setSuccessMessageAtividade('');
        }, 3000);
      } else {
        console.error('Erro ao editar o Atividade');
      }
    } catch (error) {
      console.warn('Erro ao editar o Atividade', error);
    }
  };

  const handleEditPrevisao = async () => {
    if (!previsaoToEdit) return;

    try {
      const response = await fetch(`http://localhost:8080/ecovance/previsao/${previsaoToEdit.idPrevisao}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPrevisao),
      });

      if (response.ok) {
        const updatedPrevisao = await response.json();
        setPrevisao((prevProjects) =>
          prevProjects.map((project) =>
            project.idPrevisao === updatedPrevisao.idPrevisao ? updatedPrevisao : project
          )
        );
        setSuccessMessagePrevisao('Previsão atualizado com sucesso!');
        closeEditModalPrevisao();

        setTimeout(() => {
          setSuccessMessagePrevisao('');
        }, 3000);
      } else {
        console.error('Erro ao editar o Previsão');
      }
    } catch (error) {
      console.warn('Erro ao editar o Previsão', error);
    }
  };

  const handleAddAtividade = async () => {
    try {
      const response = await fetch('http://localhost:8080/ecovance/atividade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAtividade),
      });

      if (response.ok) {
        const addedProject = await response.json();
        setAtividades((prevProjects) => [...prevProjects, addedProject]);
        setSuccessMessageAtividade('Atividade adicionado com sucesso!');
        closeAddAtividadeModal();
        setTimeout(() => {
          setSuccessMessageAtividade('');
        }, 3000);
      } else {
        console.error('Erro ao adicionar o atividade');
      }
    } catch (error) {
      console.error('Erro ao adicionar o atividade', error);
    }
  };

  const handleAddPrevisao = async () => {
    try {
      const response = await fetch('http://localhost:8080/ecovance/previsao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPrevisao),
      });

      if (response.ok) {
        const addedPrevisao = await response.json();
        setPrevisao((prevProjects) => [...prevProjects, addedPrevisao]);
        setSuccessMessagePrevisao('Previsão adicionado com sucesso!');
        closeAddPrevisaoModal();
        setTimeout(() => {
          setSuccessMessagePrevisao('');
        }, 3000);
      } else {
        console.error('Erro ao adicionar o previsao');
      }
    } catch (error) {
      console.error('Erro ao adicionar o previsão', error);
    }
  };

  const handleDelete = async () => {
    if (selectedAtividadeId === null) return;

    try {
      const response = await fetch(`http://localhost:8080/ecovance/atividade/${selectedAtividadeId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAtividades((prevProjects) =>
          prevProjects.filter((project) => project.idAtividade !== selectedAtividadeId)
        );
        setSuccessMessageAtividade('Atividade excluído com sucesso!');
        setTimeout(() => {
          setSuccessMessageAtividade('');
        }, 3000);
      } else {
        console.error('Erro ao excluir o atividade');
      }
    } catch (error) {
      console.error('Erro ao excluir o atividade', error);
    }
    setIsModalDeleteAtividadeOpen(false); // Fechar o modal após a exclusão
  };

  const handleDeletePrevisao = async () => {
    if (selectedPrevisaoId === null) return;

    try {
      const response = await fetch(`http://localhost:8080/ecovance/previsao/${selectedPrevisaoId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPrevisao((prevProjects) =>
          prevProjects.filter((project) => project.idPrevisao !== selectedPrevisaoId)
        );
        setSuccessMessagePrevisao('Previsão excluído com sucesso!');
        setTimeout(() => {
          setSuccessMessagePrevisao('');
        }, 3000);
      } else {
        console.error('Erro ao excluir o Previsão');
      }
    } catch (error) {
      console.error('Erro ao excluir o Previsão', error);
    }
    setIsModalDeletePrevisaoOpen(false); // Fechar o modal após a exclusão
  };

  const closeAddAtividadeModal = () => {
    setIsAddModalAtividadeOpen(false);
    setNewAtividade({
      dataFim: '',
      dataInicio: '',
      descricao: '',
      idAtividade: 0, // ou null, dependendo do tipo de dado e se o valor inicial é opcional
      id_projeto: 0, // ou null
      nome: '',
      responsavel: '',
    });
  };

    const closeAddPrevisaoModal = () => {
      setIsAddModalPrevisaoOpen(false);
      setNewPrevisao({
        dataPrevisao: '',
      geracaoPrevisao: 0,
      idPrevisao: 0, // ou null, dependendo do tipo de dado e se o valor inicial é opcional
      idProjeto: 0, // ou null
      intensidadePrevisao: '',
      tipoEnergia: '',
      });
  };
  


  

  return (
    <div className='bg-bg_black_2 flex flex-row w-screen h-screen'>
      <Navbar selection={'fontes-de-energia'} img_avatar={'avatar.png'} name_avatar={'Pedro Henrique Vasco Antonieti'} email_avatar={'pedro.antonieti@gmail.com'}/>
      <div className='w-full h-full p-[30px] flex flex-col gap-[30px]'>
      <div className='flex flex-row justify-between'>
          <div className='flex items-center'>
            <h1 className='text-white text-2xl font-bold'>Fontes de Energia</h1>
          </div>
          <div className="w-auto h-10 flex flex-row items-center gap-[10px]">
            <Image src="/icon-location.svg" alt="location" width={40} height={40}/>
            <div className="relative text-white text-base font-bold">São Gonçalo do Gurguéia, PI</div>
          </div>
        </div>
        <div className='grid grid-cols-2 text-white gap-5'>
          <div className='item-1'>
            <div className="flex flex-row items-center justify-between gap-5">
              <h2 className='text-left font-bold text-xl' id='qtd-projetos'>Atividades</h2>
              <button type="button" className="bg-green-500 text-white p-2 rounded-md" onClick={openAddAtividadeModal}>Adicionar Atividades</button>
            </div>
            <table className='text-sm border-collapse'>
              <thead className='bg-color_1 text-gray-300 border-b-2 border-color_2 font-bold text-center'>
                <tr>
                  <th className='p-2'>ID da Atividade</th>
                  <th className='p-2'>ID do Projeto</th>
                  <th className='p-2'>Nome da Atividade</th>
                  <th className='p-2'>Descrição</th>
                  <th className='p-2'>Responsável</th>
                  <th className='p-2'>Data de Início</th>
                  <th className='p-2'>Data de Fim</th>
                  <th className='p-2'>Ações</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-color_2 text-center'>
              {Array.isArray(listaAtividades) && listaAtividades.length > 0 ? (
                  listaAtividades.map((at) => (
                    <tr key={`${at.idAtividade}-${at.id_projeto}`}>
                      <td className="p-2">{at.idAtividade}</td>
                      <td className="p-2">{at.id_projeto}</td>
                      <td className="p-2">{at.nome}</td>
                      <td className="p-2">{at.descricao}</td>
                      <td className="p-2">{at.responsavel}</td>
                      <td className="p-2">{at.dataInicio}</td>
                      <td className="p-2">{at.dataFim}</td>
                      <td className="p-2">
                        <button
                          onClick={() => openEditAtividadeModal(at)}
                          className="text-white bg-blue-500 rounded px-3 py-1"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => openDeleteModalAtividade(at.idAtividade)}
                          className="text-white bg-red-500 rounded px-3 py-1 ml-2"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-2 text-center">
                      Nenhum projeto encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot className=' text-gray-400 border-t-2 border-color_2 font-bold'>
                <tr>
                  <td colSpan={5} className='p-2 col-span-5'>{listaAtividades.length === 0 ? '' : `Exibindo ${listaAtividades.length} Atividade${listaAtividades.length > 1 ? 's' : ''}.`}</td>
                </tr>
              </tfoot>
            </table>
            <div>
              {successMessageAtividade && (
                <div className="bg-green-500 text-white p-2 rounded-md mt-2 text-center">
                  {successMessageAtividade}
                </div>
              )}
            </div>
          </div>

          {/* Modal para adição de Atividades*/}
          {isAddModalAtividadeOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-black">
              <div className="bg-white rounded-lg p-6 w-1/3">
                <h2 className="text-2xl font-bold mb-4">Adicionar Atividade</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleAddAtividade(); }}>
                  <div className="mb-4">
                    <label htmlFor="id_projeto" className="block text-gray-700">Id do Projeto:</label>
                    <input
                      type="text"
                      id="id_projeto"
                      name="id_projeto"
                      value={newAtividade.id_projeto}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="nome" className="block text-gray-700">Nome:</label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={newAtividade.nome}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="descricao" className="block text-gray-700">Descrição:</label>
                    <textarea
                      id="descricao"
                      name="descricao"
                      value={newAtividade.descricao}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="responsavel" className="block text-gray-700">Responsável:</label>
                    <input
                      type="text"
                      id="responsavel"
                      name="responsavel"
                      value={newAtividade.responsavel}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="dataInicio" className="block text-gray-700">Data de Início:</label>
                    <input
                      type="date"
                      id="dataInicio"
                      name="dataInicio"
                      value={newAtividade.dataInicio}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="dataFim" className="block text-gray-700">Data de Fim:</label>
                    <input
                      type="date"
                      id="dataFim"
                      name="dataFim"
                      value={newAtividade.dataFim}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={closeAddAtividadeModal}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Adicionar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Modal para adição de Previsões*/}
          {isAddModalPrevisaoOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-black">
              <div className="bg-white rounded-lg p-6 w-1/3">
                <h2 className="text-2xl font-bold mb-4">Adicionar Previsões</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleAddPrevisao(); }}>
                <div className="mb-4">
                    <label htmlFor="idProjeto" className="block text-gray-700">Id do Projeto:</label>
                    <input
                      type="text"
                      id="idProjeto"
                      name="idProjeto"
                      value={newPrevisao.idProjeto}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="dataPrevisao" className="block text-gray-700">Data de Previsão:</label>
                    <input
                      type="date"
                      id="dataPrevisao"
                      name="dataPrevisao"
                      value={newPrevisao.dataPrevisao}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div> 
                  <div className="mb-4">
                    <label htmlFor="tipoEnergia" className="block">Tipo de Energia:</label>
                    <select
                      name='tipoEnergia'
                      value={newPrevisao.tipoEnergia}
                      onChange={handleInputChange}
                      className='w-full p-2 border border-gray-300 rounded-md'
                      required
                    >
                      <option value=''>Selecione...</option>
                      <option value='solar'>Solar</option>
                      <option value='eólica'>Eólica</option>
                      <option value='geotérmica'>Geotérmica</option>
                      <option value='biomassa'>Biomassa</option>
                      <option value='oceânica'>Oceânica</option>
                      <option value='hidrelétrica'>Hidrelétrica</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="geracaoPrevisao" className="block text-gray-700">Geração Prevista:</label>
                    <input
                      type="text"
                      id="geracaoPrevisao"
                      name="geracaoPrevisao"
                      value={newPrevisao.geracaoPrevisao}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="intensidadePrevisao" className="block">Intensidade:</label>
                    <select
                      name='intensidadePrevisao'
                      value={newPrevisao.intensidadePrevisao}
                      onChange={handleInputChange}
                      className='w-full p-2 border border-gray-300 rounded-md'
                      required
                    >
                      <option value=''>Selecione...</option>
                      <option value='baixa'>Baixa</option>
                      <option value='media'>Média</option>
                      <option value='alta'>Alta</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={closeAddPrevisaoModal}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Adicionar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Modal para exclusão de atividades*/}
        {isModalDeleteAtividadeOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-black">
            <div className="bg-white p-6 rounded-md w-96">
              <h2 className="text-lg font-bold mb-4">Excluir Atividade</h2>
              <p>Você tem certeza que deseja excluir este atividade?</p>
              <div className="flex justify-between gap-3 mt-4">
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Excluir
                </button>
                <button
                  onClick={closeDeleteModalAtividade}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

          {/* Modal para exclusão de previsões*/}
          {isModalDeletePrevisaoOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-black">
            <div className="bg-white p-6 rounded-md w-96">
              <h2 className="text-lg font-bold mb-4">Excluir Previsão</h2>
              <p>Você tem certeza que deseja excluir esta previsão?</p>
              <div className="flex justify-between gap-3 mt-4">
                <button
                  onClick={handleDeletePrevisao}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Excluir
                </button>
                <button
                  onClick={closeDeleteModalPrevisao}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
          
          {/* Modal para edição de atividades*/}
          {isEdditModalOpenAtividade && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-black">
              <div className="bg-white rounded-lg p-6 w-1/3">
                <h2 className="text-2xl font-bold mb-4">Editar Atividade</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleEditAtividade(); }}>
                  <div className="mb-4">
                    <label htmlFor="id_projeto-disable" className="block text-gray-700" >Id do Projeto:</label>
                    <input
                      type="text"
                      id="id_projeto-disable"
                      name="id_projeto-disable"
                      value={newAtividade.id_projeto}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      disabled
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="nome" className="block text-gray-700">Nome:</label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={newAtividade.nome}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="descricao" className="block text-gray-700">Descrição:</label>
                    <textarea
                      id="descricao"
                      name="descricao"
                      value={newAtividade.descricao}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="responsavel" className="block text-gray-700">Responsável:</label>
                    <input
                      type="text"
                      id="responsavel"
                      name="responsavel"
                      value={newAtividade.responsavel}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="dataInicio" className="block text-gray-700">Data de Início:</label>
                    <input
                      type="date"
                      id="dataInicio"
                      name="dataInicio"
                      value={newAtividade.dataInicio}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="dataFim" className="block text-gray-700">Data de Fim:</label>
                    <input
                      type="date"
                      id="dataFim"
                      name="dataFim"
                      value={newAtividade.dataFim}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={closeEditModalAtividade}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Salvar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Modal para edição de Previsões*/}
          {isEdditModalOpenPrevisao && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-black">
              <div className="bg-white rounded-lg p-6 w-1/3">
                <h2 className="text-2xl font-bold mb-4">Editar Previsões</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleEditPrevisao(); }}>
                <div className="mb-4">
                    <label htmlFor="idProjeto" className="block text-gray-700">Id do Projeto:</label>
                    <input
                      type="text"
                      id="idProjeto"
                      name="idProjeto"
                      value={newPrevisao.idProjeto}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      disabled
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="dataPrevisao" className="block text-gray-700">Data de Previsão:</label>
                    <input
                      type="date"
                      id="dataPrevisao"
                      name="dataPrevisao"
                      value={newPrevisao.dataPrevisao}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div> 
                  <div className="mb-4">
                    <label htmlFor="tipoEnergia" className="block">Tipo de Energia:</label>
                    <select
                      name='tipoEnergia'
                      value={newPrevisao.tipoEnergia}
                      onChange={handleInputChange}
                      className='w-full p-2 border border-gray-300 rounded-md'
                      required
                    >
                      <option value=''>Selecione...</option>
                      <option value='solar'>Solar</option>
                      <option value='eólica'>Eólica</option>
                      <option value='geotérmica'>Geotérmica</option>
                      <option value='biomassa'>Biomassa</option>
                      <option value='oceânica'>Oceânica</option>
                      <option value='hidrelétrica'>Hidrelétrica</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="geracaoPrevisao" className="block text-gray-700">Geração Prevista:</label>
                    <input
                      type="text"
                      id="geracaoPrevisao"
                      name="geracaoPrevisao"
                      value={newPrevisao.geracaoPrevisao}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="intensidadePrevisao" className="block">Intensidade:</label>
                    <select
                      name='intensidadePrevisao'
                      value={newPrevisao.intensidadePrevisao}
                      onChange={handleInputChange}
                      className='w-full p-2 border border-gray-300 rounded-md'
                      required
                    >
                      <option value=''>Selecione...</option>
                      <option value='baixa'>Baixa</option>
                      <option value='media'>Média</option>
                      <option value='alta'>Alta</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={closeEditModalPrevisao}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Adicionar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}


          <div className='item-2'>
            <div className="flex flex-row items-center justify-between gap-5">
              <h2 className='text-left font-bold text-xl' id='qtd-projetos'>Previsões</h2>
              <button type="button" className="bg-green-500 text-white p-2 rounded-md" onClick={openAddPrevisaoModal}>Adicionar Previsões</button>
            </div>
            <table className='text-sm border-collapse'>
              <thead className='bg-color_1 text-gray-300 border-b-2 border-color_2 font-bold text-center'>
                <tr>
                  <th className='p-2'>ID da Previsão</th>
                  <th className='p-2'>ID do Projeto</th>
                  <th className='p-2'>Data da Previsão</th>
                  <th className='p-2'>Tipo de Energia</th>
                  <th className='p-2'>Gereção Prevista</th>
                  <th className='p-2'>Intensidade</th>
                  <th className='p-2'>Ações</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-color_2 text-center'>
              {Array.isArray(listaPrevisao) && listaPrevisao.length > 0 ? (
                  listaPrevisao.map((pv) => (
                    <tr key={`${pv.idPrevisao}-${pv.idProjeto}`}>
                      <td className="p-2">{pv.idPrevisao}</td>
                      <td className="p-2">{pv.idProjeto}</td>
                      <td className="p-2">{pv.dataPrevisao}</td>
                      <td className="p-2">{pv.tipoEnergia}</td>
                      <td className="p-2">{pv.geracaoPrevisao}</td>
                      <td className="p-2">{pv.intensidadePrevisao}</td>
                      <td className="p-2">
                        <button
                          onClick={() => openEditPrevisaoModal(pv)}
                          className="text-white bg-blue-500 rounded px-3 py-1"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => openDeleteModalPrevisao(pv.idPrevisao)}
                          className="text-white bg-red-500 rounded px-3 py-1 ml-2"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-2 text-center">
                      Nenhum projeto encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot className=' text-gray-400 border-t-2 border-color_2 font-bold'>
                <tr>
                  <td colSpan={5} className='p-2 col-span-5'>{listaPrevisao.length === 0 ? '' : `Exibindo ${listaPrevisao.length} Previs${listaPrevisao.length > 1 ? 'ões' : 'ão'}.`}</td>
                </tr>
              </tfoot>
            </table>
            <div>
              {successMessagePrevisao && (
                <div className="bg-green-500 text-white p-2 rounded-md mt-2 text-center">
                  {successMessagePrevisao}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
