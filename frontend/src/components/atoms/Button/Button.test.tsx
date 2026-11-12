import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('exibe o texto recebido', () => {
    render(<Button label="Salvar" />);
    expect(screen.getByRole('button', { name: 'Salvar' })).toBeInTheDocument();
  });

  it('chama onClick ao clicar', async () => {
    const onClick = vi.fn();
    render(<Button label="Salvar" onClick={onClick} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('não dispara onClick quando desabilitado', async () => {
    const onClick = vi.fn();
    render(<Button label="Salvar" disabled onClick={onClick} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });
});
