import './UnderConstruction.css';

interface UnderConstructionProps {
  /** Nome da tela, por exemplo "Leads". */
  pageName: string;
}

export function UnderConstruction({ pageName }: UnderConstructionProps) {
  return (
    <section className="under-construction">
      <h2 className="under-construction__title">Em construção</h2>
      <p className="under-construction__text">
        A tela de {pageName} ainda está sendo desenvolvida.
      </p>
    </section>
  );
}
