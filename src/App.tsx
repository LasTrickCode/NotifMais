import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Fallback } from "./components/fallback";
import { Loading } from "./components/loading";
import { Layout } from "./components/layout";
import { NotFound } from './pages/not-found';
import { Integrantes } from './pages/integrantes';
import { FAQ } from './pages/faq';
import { Home } from './pages/home';
import { Contato } from './pages/contato';
import { Sobre } from './pages/sobre';

function App() {
  
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={Fallback}>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/sobre" element={<Sobre/>}/>
              <Route path="/integrantes" element={<Integrantes />} />
              <Route path="/contato" element={<Contato />}/>
              <Route path="/faq" element={<FAQ />} />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
