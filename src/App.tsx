import { lazy, Suspense, useCallback, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import type { NotifSession } from "./types/notif-session";
import { Fallback } from "./components/fallback";
import { Loading } from "./components/loading";
import { Layout } from "./components/layout";

const Home = lazy(() =>
  import("./pages/home").then((m) => ({ default: m.Home }))
);

const AddSession = lazy(() =>
  import("./pages/add-notif").then((m) => ({ default: m.AddSession }))
);

const SessionDetails = lazy(() =>
  import("./pages/notif-details").then((m) => ({ default: m.NotifDetails }))
);

const NotFound = lazy(() =>
  import("./pages/not-found").then((m) => ({ default: m.NotFound }))
);

const Integrantes = lazy(() =>
  import("./pages/integrantes").then((m) => ({ default: m.Integrantes }))
);

const FAQ = lazy(() => import("./pages/faq").then((m) => ({ default: m.FAQ })));

function App() {
  const [sessions, setSession] = useState<NotifSession[]>([]);

  const addSession = useCallback((sessions: NotifSession) => {
    setSession((prev) => [...prev, sessions]);
  }, []);

  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={Fallback}>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home sessions={sessions} />} />
              <Route
                path="/add"
                element={<AddSession onAdd={addSession} sessions={sessions} />}
              />
              <Route path="/session/:id" element={<SessionDetails />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/integrantes" element={<Integrantes />} />
              <Route path="/faq" element={<FAQ />} />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
