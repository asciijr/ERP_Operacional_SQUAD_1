type ButtonProps = {
  label: string;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
};

/** Átomo de referência: genérico, sem regra de negócio, tudo via props. */
export function Button({
  label,
  variant = 'primary',
  type = 'button',
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <button type={type} className={`btn btn-${variant}`} disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
}
