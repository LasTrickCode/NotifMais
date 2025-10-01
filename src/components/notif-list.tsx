import type { NotifSession } from "../types/notif-session";
import { NotifResume } from "./notif-resume";

interface NotifListProps {
  NotifList: NotifSession[];
}

export function NotifList({ NotifList }: NotifListProps) {
  return (
    <>
      {NotifList.map((value) => {
        return <NotifResume notif={value} />;
      })}
    </>
  );
}