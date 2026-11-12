import { useEffect, useState } from 'react';
import { Button } from '../components/atoms/Button';
import { getHealth } from '../services/health';

/** Página inicial provisória: confirma que frontend e backend estão conectados. */
export function HomePage() {
  const [apiStatus, setApiStatus] = useState('verificando...');

  const check = () => {
    getHealth()
      .then((res) => setApiStatus(res.status))
      .catch(() => setApiStatus('indisponível'));
  };

  useEffect(check, []);

  return (
    <main className="container">
      <h1>ERP Operacional</h1>
      <p>
        API: <strong>{apiStatus}</strong>
      </p>
      <Button label="Verificar novamente" onClick={check} />
    </main>
  );
}
