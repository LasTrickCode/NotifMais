import type { NotifSession } from "../types/notif-session";

interface NotifCardProps {
  notif: NotifSession;
}

export function NotifCard({ notif }: NotifCardProps) {
  return (
    <div className="bg-white shadow rounded-lg p-4 w-3/5 ">
      <h2 className="text-lg font-bold text-black">{notif.subject}</h2>
      <p className="text-gray-800">Anotações: {notif.notes}</p>
      <p className="text-gray-800">Data: {notif.date}</p>
    </div>
  );
}