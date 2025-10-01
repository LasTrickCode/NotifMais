import { useMemo } from "react";
import type { NotifSession } from "../types/notif-session";
import { SessionForm } from "../components/session-form";

interface AddSessionProps {
  sessions: NotifSession[];
  onAdd: (session: NotifSession) => void;
}

export function AddSession({ sessions, onAdd }: AddSessionProps) {
  const sessionTotal = useMemo(() => {
    return sessions.length;
  }, [sessions]);

  return (
    <>
      <h2 className="font-bold text-black text-3xl  mb-3">
        Adicionar notificação
      </h2>

      <p className="text-lg font-bold text-gray-800">
        Total de notificações: {sessionTotal}
      </p>

      <SessionForm onAdd={onAdd} />
    </>
  );
}