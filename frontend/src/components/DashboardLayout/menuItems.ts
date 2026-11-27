export interface MenuItem {
  id: string;
  label: string;
  path: string;
}

export const menuItems: MenuItem[] = [
  { id: 'leads', label: 'Leads', path: '/leads' },
  { id: 'kanban', label: 'Kanban', path: '/kanban' },
  { id: 'clientes', label: 'Clientes', path: '/clientes' },
  { id: 'contratos', label: 'Contratos', path: '/contratos' },
  { id: 'projetos', label: 'Projetos', path: '/projetos' },
];
