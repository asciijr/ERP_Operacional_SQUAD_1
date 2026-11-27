# ADR 0005: Biblioteca de rotas do frontend

> Confirme o número na pasta `docs/decisions/` e copie o formato do ADR 0004, se for diferente deste.

- **Status:** Proposto
- **Data:** AAAA-MM-DD
- **Autor:** <seu nome>
- **Aprovador:** Ilton (Tech Lead)

## Contexto

O frontend (React + TypeScript + Vite) precisa de navegação entre telas. O primeiro uso é o
`DashboardLayout`, com menu lateral para Leads, Kanban, Clientes, Contratos e Projetos.
Hoje a navegação é provisória, feita por estado em `App.tsx`, e não tem URL própria por tela,
botão voltar nem link compartilhável.

Necessidades:

- uma URL para cada tela, com o botão voltar do navegador funcionando;
- rotas aninhadas, para o layout (menu + cabeçalho) ficar fixo e só o conteúdo trocar;
- bom suporte a TypeScript;
- baixa curva de aprendizado para um time júnior;
- facilidade de testar com a suíte de testes do projeto.

## Opções consideradas

### 1. React Router

- Biblioteca mais usada para roteamento em React, com muita documentação e exemplos.
- Rotas aninhadas e layout compartilhado com `<Outlet />`, que é exatamente o caso do `DashboardLayout`.
- Componente `NavLink` indica o item ativo do menu automaticamente.
- Pode ser usado só como biblioteca de rotas, sem adotar o modo framework.
- Tipagem em TypeScript suficiente, porém os parâmetros de rota não são verificados em tempo de compilação como na opção 2.

### 2. TanStack Router

- Rotas totalmente tipadas: links e parâmetros inválidos dão erro de compilação.
- Rotas aninhadas e layouts também são suportados.
- Comunidade e material de estudo menores; configuração inicial mais longa e conceitos mais avançados.

### 3. Sem biblioteca (estado manual, situação atual)

- Nenhuma dependência nova.
- Não resolve URL, botão voltar nem rotas aninhadas; exigiria reimplementar o que as bibliotecas já fazem.
- Serve só como solução temporária.

## Decisão proposta

Adotar o **React Router**, pela combinação de maturidade, material de estudo e encaixe direto
com o `DashboardLayout` (`NavLink` + `Outlet`). O principal ponto contra é a tipagem de rotas
menos rígida que a do TanStack Router.

## Consequências

- Nova dependência no `frontend/package.json` (versão estável atual, a confirmar na instalação).
- `App.tsx` passa a declarar as rotas; o `DashboardLayout` troca `<a>` por `NavLink` e `children` por `Outlet`.
- Se no futuro for necessária tipagem estrita de rotas, a migração para o TanStack Router seria um novo ADR.

## Próximos passos

1. Tech Lead revisa e aprova (ou pede alterações) neste ADR.
2. Só depois da aprovação: instalar a dependência e ligar as 5 páginas às rotas.
