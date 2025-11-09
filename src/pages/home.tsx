import { useEffect, useState } from "react";
import type { Lembrete } from "../types/lembrete";
import type { Consulta } from "../types/consulta";

import { API_NOTIF } from "../api/notif-info";

export function Home() {
  const [lembretes, setLembretes] = useState<Lembrete[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // pega o pacienteId salvo no login (pode ser string no localStorage)
    const pacienteIdRaw = localStorage.getItem("pacienteId");
    if (!pacienteIdRaw) {
      setLoading(false);
      return;
    }

    // parse pra número (seguro caso tenha salvo string)
    const pacienteId = Number(pacienteIdRaw);
    if (Number.isNaN(pacienteId)) {
      console.error("pacienteId inválido no localStorage:", pacienteIdRaw);
      setLoading(false);
      return;
    }

    async function fetchLembretes() {
      try {
        const res = await fetch(`${API_NOTIF}/lembretes?pacienteId=${pacienteId}`);
        if (!res.ok) throw new Error("Erro ao buscar lembretes");
        const data: Lembrete[] = await res.json();
        setLembretes(data ?? []);
      } catch (err) {
        console.error("Erro ao carregar lembretes:", err);
        setLembretes([]);
      } finally {
        setLoading(false);
      }
    }

    fetchLembretes();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Carregando lembretes...</div>;
  }

  if (lembretes.length === 0) {
    return <div className="text-center mt-10 text-gray-500">Nenhuma notificação disponível.</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Minhas Notificações</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {lembretes.map((lembrete) => {
          const consulta: Consulta | undefined = lembrete.consulta;
          if (!consulta) return null;

     

          return (
            <div
              key={lembrete.id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-blue-600 mb-2">
                {consulta.tipo ? `Consulta ${consulta.tipo}` : "Consulta"}
              </h3>

              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <strong>Médico:</strong> {consulta.medico?.nome} (
                  {consulta.medico?.especialidade})
                </p>
                <p>
                  <strong>Paciente:</strong> {consulta.paciente?.nome}
                </p>
                
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded-md text-white text-xs ${
                      consulta.statusConfirmacao === "C"
                        ? "bg-green-500"
                        : consulta.statusConfirmacao === "P"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {consulta.statusConfirmacao === "C"
                      ? "Confirmada"
                      : consulta.statusConfirmacao === "P"
                      ? "Pendente"
                      : "Desmarcada"}
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
