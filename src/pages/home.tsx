import { useEffect, useState } from "react";

export function Home() {
  const [notificacoes, setNotificacoes] = useState<any[]>([]);

  useEffect(() => {
    async function buscarNotificacoes() {
      try {
        const resposta = await fetch("https://notifmais.onrender.com");  
        if (!resposta.ok) throw new Error("Erro ao buscar notificações");
        const dados = await resposta.json();

        
        const lista = Array.isArray(dados) ? dados : [dados];
        setNotificacoes(lista);
      } catch (erro) {
        console.error("Erro ao carregar notificações:", erro);
      }
    }

    buscarNotificacoes();
  }, []);

  if (notificacoes.length === 0)
    return (
      <div className="text-gray-500 italic text-sm">
        Nenhuma notificação disponível.
      </div>
    );

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {notificacoes.map((item) => (
        <div
          key={item.idConsulta}
          className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-blue-600 mb-2">
            Nova consulta marcada
          </h3>
          <div className="text-sm text-gray-700 space-y-1">
            <p>
              <strong>Paciente:</strong> {item.paciente?.nome}
            </p>
            <p>
              <strong>Médico:</strong> {item.medico?.nome} (
              {item.medico?.especialidade})
            </p>
            <p>
              <strong>Data:</strong> {item.data} às {item.hora}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
