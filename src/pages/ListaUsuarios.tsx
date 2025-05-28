import { useState, useEffect } from 'react';
import { useAuth } from '../utils/useAuth';
import { api } from '../utils/apiClient';

interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  dataVencimento: string; // or Date if you prefer
  status: string;
  usuario: {
    id: number;
    nome: string;
    email: string;
  };
}

function GerenciadorTarefas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { usuario } = useAuth();
  
  // Form state
  const [novaTarefa, setNovaTarefa] = useState({
    titulo: '',
    descricao: '',
    dataVencimento: '',
    status: 'PENDENTE' // default status
  });

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const response = await api.get('/tarefas');
        setTarefas(response.data);
      } catch (err) {
        setError('Falha ao carregar tarefas');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTarefas();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNovaTarefa(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!novaTarefa.titulo.trim()) {
      setError('Título é obrigatório');
      return;
    }

    try {
      const response = await api.post('/tarefas', {
        ...novaTarefa,
        usuarioId: usuario?.id // Assuming your auth context provides user info
      });
      
      setTarefas([...tarefas, response.data]);
      setNovaTarefa({
        titulo: '',
        descricao: '',
        dataVencimento: '',
        status: 'PENDENTE'
      });
      setError(null);
    } catch (err) {
      setError('Falha ao criar tarefa');
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      return;
    }

    try {
      await api.delete(`/tarefas/${id}`);
      setTarefas(tarefas.filter(t => t.id !== id));
    } catch (err) {
      setError('Falha ao excluir tarefa');
      console.error(err);
    }
  };

  if (loading) return <div>Carregando tarefas...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Gerenciador de Tarefas</h1>
      
      {/* Create Task Form */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Nova Tarefa</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Título*</label>
              <input
                type="text"
                name="titulo"
                value={novaTarefa.titulo}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                value={novaTarefa.status}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="PENDENTE">Pendente</option>
                <option value="EM_ANDAMENTO">Em Andamento</option>
                <option value="CONCLUIDA">Concluída</option>
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Descrição</label>
            <textarea
              name="descricao"
              value={novaTarefa.descricao}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Data de Vencimento</label>
            <input
              type="date"
              name="dataVencimento"
              value={novaTarefa.dataVencimento}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
          </div>
          
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Criar Tarefa
          </button>
        </form>
      </div>
      
      {/* Tasks List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Suas Tarefas</h2>
        
        {tarefas.length === 0 ? (
          <p className="text-gray-500">Nenhuma tarefa encontrada.</p>
        ) : (
          <div className="space-y-4">
            {tarefas.map(tarefa => (
              <div key={tarefa.id} className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{tarefa.titulo}</h3>
                    <p className="text-gray-600 mb-2">{tarefa.descricao}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className={`px-2 py-1 rounded ${
                        tarefa.status === 'CONCLUIDA' ? 'bg-green-100 text-green-800' :
                        tarefa.status === 'EM_ANDAMENTO' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {tarefa.status === 'PENDENTE' ? 'Pendente' : 
                         tarefa.status === 'EM_ANDAMENTO' ? 'Em Andamento' : 'Concluída'}
                      </span>
                      {tarefa.dataVencimento && (
                        <span className="text-gray-600">
                          Vence em: {new Date(tarefa.dataVencimento).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDelete(tarefa.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Excluir tarefa"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {tarefa.usuario && (
                  <div className="mt-2 text-xs text-gray-500">
                    Criado por: {tarefa.usuario.nome} ({tarefa.usuario.email})
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GerenciadorTarefas;