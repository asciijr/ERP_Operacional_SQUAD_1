// Roteamento (ex.: react-router) � decis�o de arquitetura: registrar em docs/decisions/ antes de adicionar.
//export default function App() {
//return <HomePage />;
//}

import { useState } from 'react';
import type { ReactElement } from 'react';
import { DashboardLayout } from './components/DashboardLayout/DashboardLayout';
import { LeadsPage } from './pages/LeadsPage';
import { KanbanPage } from './pages/KanbanPage';
import { ClientesPage } from './pages/ClientesPage';
import { ContratosPage } from './pages/ContratosPage';
import { ProjetosPage } from './pages/ProjetosPage';
import './styles/tokens.css';

const pages: Record<string, ReactElement> = {
  '/leads': <LeadsPage />,
  '/kanban': <KanbanPage />,
  '/clientes': <ClientesPage />,
  '/contratos': <ContratosPage />,
  '/projetos': <ProjetosPage />,
};

function App() {
  const [activePath, setActivePath] = useState('/leads');

  return (
    <DashboardLayout activePath={activePath} onNavigate={setActivePath}>
      {pages[activePath]}
    </DashboardLayout>
  );
}

export default App;
