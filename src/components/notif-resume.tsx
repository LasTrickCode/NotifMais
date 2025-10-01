import { Link } from "react-router-dom";
import type { NotifSession } from "../types/notif-session";

interface NotifResumeProps {
  notif: NotifSession;
}

export function NotifResume({ notif }: NotifResumeProps) {
  return (
    <div className="w-3/5 rounded-lg shadow px-3 py-4 flex flex-col gap-5 mb-3 bg-[white] transition-transform duration-200 hover:scale-101">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <h2 className="font-bold text-black">{notif.subject}</h2>

          <Link
            to={`/session/${notif.id}`}
            state={{ notif }}
            className="text-white font-bold bg-blue-500 rounded border p-2 transition-transform duration-200 hover:scale-105"
          >
            Detalhes
          </Link>
        </div>

        <h3>Data: {notif.date}</h3>
        <h3>Anotações: {notif.notes}</h3>
      </div>
    </div>
  );
}