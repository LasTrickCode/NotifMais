import { useLocation, useParams } from "react-router-dom";
import { NotifCard } from "../components/notif-card";

export function NotifDetails() {
  const { id } = useParams();
  const location = useLocation();
  const notif = location.state?.notif; 

  if (!notif) {
    return <p>Notificação não encontrada!</p>;
  }

  return (
    <>
      <h2 className="font-bold text-blue-500 text-xl mb-3">
        Detalhes da sessão - ID {id}
      </h2>

      <NotifCard notif={notif} />
    </>
  );
}
