import React, { useState } from 'react';
import { useAuth } from '../utils/useAuth';
import { api } from '../utils/apiClient';
import { Usuario } from '../utils/auth';

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const { usuario, isAdmin } = useAuth(); 
  const [loadingDelete, setLoadingDelete] = useState<string | null>(null);

  const handleDelete = async (userId: string) => {
    if (!isAdmin || !window.confirm('Tem certeza que deseja excluir este usuário?')) {
      return;
    }

    setLoadingDelete(userId);
    try {
      await api.delete(`/usuarios/${userId}`);
      setUsuarios(usuarios.filter(u => u.id !== userId));
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      alert('Não foi possível excluir o usuário');
    } finally {
      setLoadingDelete(null);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Usuários</h1>
      
      <ul className="space-y-3">
        {usuarios.map((usuarioItem) => ( // Renomeado para evitar conflito com a variável 'usuario'
          <li key={usuarioItem.id} className="border p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <p><strong>Nome:</strong> {usuarioItem.nome}</p>
                <p><strong>Email:</strong> {usuarioItem.email}</p>
                {usuarioItem.authorities && (
                  <p><strong>Permissões:</strong> {usuarioItem.authorities.map(a => a.authority).join(', ')}</p>
                )}
              </div>

              {isAdmin && (
                <button
                  onClick={() => handleDelete(usuarioItem.id)}
                  disabled={loadingDelete === usuarioItem.id}
                  className={`
                    px-3 py-1 rounded text-sm
                    ${loadingDelete === usuarioItem.id
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-red-500 hover:bg-red-600 text-white'
                    }
                  `}
                  aria-label={`Excluir usuário ${usuarioItem.nome}`}
                >
                  {loadingDelete === usuarioItem.id ? (
                    <span className="flex items-center">
                      <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
                      </svg>
                      Excluindo...
                    </span>
                  ) : (
                    'Excluir'
                  )}
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaUsuarios;