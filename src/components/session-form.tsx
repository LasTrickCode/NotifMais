import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { NotifSession } from "../types/notif-session";

interface SessionFormProps {
  onAdd: (session: NotifSession) => void;
}

export function SessionForm({ onAdd }: SessionFormProps) {
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const navigate = useNavigate(); 

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const session: NotifSession = {
      id: crypto.randomUUID(),
      subject,
      date,
      notes,
    };

    onAdd(session);

    setSubject("");
    setDate("");
    setNotes("");

    navigate("/"); 
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-lg p-4 flex flex-col gap-3 mb-5 w-4/5 font-bold"
    >
      <label htmlFor="session-subject">Tipo de consulta</label>
      <input
        type="text"
        id="session-subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Tipo de consulta"
        className="border rounded p-2"
      />

      <label htmlFor="session-minutes">Duração (min)</label>
      <input
        type="number"
        id="session-minutes"
        placeholder="Duração (min)"
        className="border rounded p-2"
      />

      <label htmlFor="session-date">Data</label>
      <input
        type="date"
        id="session-date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="Data"
        className="border rounded p-2"
      />

      <label htmlFor="session-notes">Anotações</label>
      <input
        type="text"
        id="session-notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Anotações"
        className="border rounded p-2"
      />

      <button
        type="submit"
        className="bg-blue-500 text-black font-bold px-4 py-2 rounded transition-transform duration-200 hover:scale-101"
      >
        Criar Notificação
      </button>
    </form>
  );
}