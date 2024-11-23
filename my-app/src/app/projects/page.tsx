"use client";
import Navbar from '@/components/Globais/Navbar';
import { ProjectsData } from '@/types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function Projetos() {
  const [listaProjects, setListaProjects] = useState<ProjectsData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEdditModalOpen, setIsEdditModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<ProjectsData | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [newProject, setNewProject] = useState({
    nome: '',
    descricao: '',
    localizacao: '',
    tipoEnergia: '',
  });

  // Função para carregar projetos ao montar o componente
  useEffect(() => {
    document.title = "EcoVance · Projetos";

    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:8080/ecovance/');
        const projetosData = await response.json();
        setListaProjects(projetosData);
      } catch (error) {
        console.error("Erro ao chamar a API: ", error);
      }
    };

    fetchProjects();
  }, []);

  // Função para editar projeto
  const handleEditProject = async () => {
    if (!projectToEdit) return;

    try {
      const response = await fetch(`http://localhost:8080/ecovance/${projectToEdit.idProjeto}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });

      if (response.ok) {
        const updatedProject = await response.json();
        setListaProjects((prevProjects) =>
          prevProjects.map((project) =>
            project.idProjeto === updatedProject.idProjeto ? updatedProject : project
          )
        );
        setSuccessMessage('Projeto atualizado com sucesso!');
        closeEditModal();

        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        console.error('Erro ao editar o projeto');
      }
    } catch (error) {
      console.warn('Erro ao editar o projeto', error);
    }
  };

  // Funções para abrir e fechar o modal de edição
  const openEditModal = (project: ProjectsData) => {
    setProjectToEdit(project);
    setNewProject({
      nome: project.nome,
      descricao: project.descricao,
      localizacao: project.localizacao,
      tipoEnergia: project.tipoEnergia,
    });
    setIsEdditModalOpen(true);
  };

  const closeEditModal = () => {
    setProjectToEdit(null);
    setIsEdditModalOpen(false);
    setNewProject({
      nome: '',
      descricao: '',
      localizacao: '',
      tipoEnergia: '',
    });
  };

  // Função para excluir projeto
  const handleDelete = async () => {
    if (selectedProjectId === null) return;

    try {
      const response = await fetch(`http://localhost:8080/ecovance/${selectedProjectId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setListaProjects((prevProjects) =>
          prevProjects.filter((project) => project.idProjeto !== selectedProjectId)
        );
        setSuccessMessage('Projeto excluído com sucesso!');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        console.error('Erro ao excluir o projeto');
      }
    } catch (error) {
      console.error('Erro ao excluir o projeto', error);
    }
    setIsModalOpen(false); // Fechar o modal após a exclusão
  };

  // Funções para abrir e fechar o modal de exclusão
  const openDeleteModal = (idProjeto: number) => {
    setSelectedProjectId(idProjeto);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setSelectedProjectId(null);
  };

  // Funções para adicionar um novo projeto
  const handleAddProject = async () => {
    try {
      const response = await fetch('http://localhost:8080/ecovance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });

      if (response.ok) {
        const addedProject = await response.json();
        setListaProjects((prevProjects) => [...prevProjects, addedProject]);
        setSuccessMessage('Projeto adicionado com sucesso!');
        closeAddProjectModal();
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        console.error('Erro ao adicionar o projeto');
      }
    } catch (error) {
      console.error('Erro ao adicionar o projeto', error);
    }
  };

  const openAddProjectModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddProjectModal = () => {
    setIsAddModalOpen(false);
    setNewProject({
      nome: '',
      descricao: '',
      localizacao: '',
      tipoEnergia: '',
    });
  };

  // Função para lidar com mudanças nos campos do formulário
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="bg-bg_black_2 flex flex-row w-screen h-screen">
      <Navbar
        selection={'projetos'}
        img_avatar={'avatar.png'}
        name_avatar={'Pedro Henrique Vasco Antonieti'}
        email_avatar={'pedro.antonieti@gmail.com'}
      />
      <div className="w-full h-full p-[30px] flex flex-col gap-[30px]">
        <div className="flex flex-row justify-between">
          <div className="flex items-center">
            <h1 className="text-white text-2xl font-bold">Projetos</h1>
          </div>
          <div className="w-auto h-10 flex flex-row items-center gap-[10px]">
            <Image src="/icon-location.svg" alt="location" width={40} height={40} />
            <div className="relative text-white text-base font-bold">São Gonçalo do Gurguéia, PI</div>
          </div>
        </div>
        <div className="grid grid-cols-1 text-white gap-5">
          <div className="item-1">
            <div className="flex flex-row items-center justify-between gap-5">
              <h2 className="text-center font-bold text-xl" id="qtd-projetos">
                Projetos
              </h2>
              <button
                type="button"
                className="bg-green-500 text-white p-2 rounded-md"
                onClick={openAddProjectModal}
              >
                Adicionar Projeto
              </button>
            </div>
            <table className="text-sm border-collapse">
              <thead className="bg-color_1 text-gray-300 border-b-2 border-color_2 font-bold text-center">
                <tr>
                  <th className="p-2">ID do Projeto</th>
                  <th className="p-2">Nome do Projeto</th>
                  <th className="p-2">Descrição</th>
                  <th className="p-2">Localização</th>
                  <th className="p-2">Tipo de Energia</th>
                  <th className="p-2">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-color_2 text-center">
                {Array.isArray(listaProjects) && listaProjects.length > 0 ? (
                  listaProjects.map((pj) => (
                    <tr key={`${pj.idProjeto}-${pj.tipoEnergia}`}>
                      <td className="p-2">{pj.idProjeto}</td>
                      <td className="p-2">{pj.nome}</td>
                      <td className="p-2">{pj.descricao}</td>
                      <td className="p-2">{pj.localizacao}</td>
                      <td className="p-2">{pj.tipoEnergia}</td>
                      <td className="p-2">
                        <button
                          onClick={() => openEditModal(pj)}
                          className="text-white bg-blue-500 rounded px-3 py-1"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => openDeleteModal(pj.idProjeto)}
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
                  <td colSpan={5} className='p-2 col-span-5'>{listaProjects.length === 0 ? '' : `Exibindo ${listaProjects.length} Projeto${listaProjects.length > 1 ? 's' : ''}.`}</td>
                </tr>
              </tfoot>
            </table>
            <div>
              {successMessage && (
                <div className="bg-green-500 text-white p-2 rounded-md mt-2 text-center">
                  {successMessage}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal para edição */}
        {isEdditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md w-96">
              <h2 className="text-lg font-bold mb-4">Editar Projeto</h2>
              <div className="mb-4">
                <label htmlFor="nome" className="block">Nome</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={newProject.nome}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="descricao" className="block">Descrição</label>
                <textarea
                  id="descricao"
                  name="descricao"
                  value={newProject.descricao}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="localizacao" className="block">Localização</label>
                <input
                  type="text"
                  id="localizacao"
                  name="localizacao"
                  value={newProject.localizacao}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="tipoEnergia" className="block">Tipo de Energia</label>
                <select
                  name='tipoEnergia'
                  value={newProject.tipoEnergia}
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
              <div className="flex justify-between gap-3">
                <button
                  onClick={handleEditProject}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Salvar
                </button>
                <button
                  onClick={closeEditModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal para exclusão */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md w-96">
              <h2 className="text-lg font-bold mb-4">Excluir Projeto</h2>
              <p>Você tem certeza que deseja excluir este projeto?</p>
              <div className="flex justify-between gap-3 mt-4">
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Excluir
                </button>
                <button
                  onClick={closeDeleteModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal para adicionar projeto */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md w-96">
              <h2 className="text-lg font-bold mb-4">Adicionar Projeto</h2>
              <div className="mb-4">
                <label htmlFor="nome" className="block">Nome</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={newProject.nome}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="descricao" className="block">Descrição</label>
                <textarea
                  id="descricao"
                  name="descricao"
                  value={newProject.descricao}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="localizacao" className="block">Localização</label>
                <input
                  type="text"
                  id="localizacao"
                  name="localizacao"
                  value={newProject.localizacao}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="tipoEnergia" className="block">Tipo de Energia</label>
                <select
                  name='tipoEnergia'
                  value={newProject.tipoEnergia}
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
              <div className="flex justify-between gap-3">
                <button
                  onClick={handleAddProject}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Adicionar
                </button>
                <button
                  onClick={closeAddProjectModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
