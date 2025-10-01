import { NotifList } from "../components/notif-list";
import type { NotifSession } from "../types/notif-session";

interface HomeProps {
  sessions: NotifSession[];
}

export function Home({ sessions }: HomeProps) {
  return (
    <>
      <NotifList NotifList={sessions} />
    </>
  );
}
