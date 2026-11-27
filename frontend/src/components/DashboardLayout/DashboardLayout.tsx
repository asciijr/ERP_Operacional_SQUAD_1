import type { ReactNode } from 'react';
import { menuItems } from './menuItems';
import './DashboardLayout.css';

interface DashboardLayoutProps {
  /** Caminho da página ativa, por exemplo "/leads". */
  activePath: string;
  /** Chamado quando a pessoa clica em um item do menu. */
  onNavigate: (path: string) => void;
  children: ReactNode;
}

/*
 * TODO (após aprovação do ADR da biblioteca de rotas):
 * - trocar os <a> do menu pelo componente de link da biblioteca escolhida;
 * - remover activePath/onNavigate e usar o roteamento para saber a página ativa;
 * - renderizar o conteúdo com o <Outlet /> (ou equivalente) no lugar de children.
 */
export function DashboardLayout({ activePath, onNavigate, children }: DashboardLayoutProps) {
  const activeItem = menuItems.find((item) => item.path === activePath);

  return (
    <div className="dashboard">
      <a className="dashboard__skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>

      <aside className="dashboard__sidebar">
        <div className="dashboard__brand">ERP Operacional</div>
        <nav aria-label="Menu principal">
          <ul className="dashboard__menu">
            {menuItems.map((item) => {
              const isActive = item.path === activePath;
              return (
                <li key={item.id}>
                  <a
                    href={item.path}
                    className={`dashboard__menu-link${isActive ? ' is-active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      onNavigate(item.path);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <div className="dashboard__main">
        <header className="dashboard__header">
          <h1 className="dashboard__title">{activeItem?.label ?? 'ERP Operacional'}</h1>
        </header>
        <main id="conteudo" className="dashboard__content">
          {children}
        </main>
      </div>
    </div>
  );
}
