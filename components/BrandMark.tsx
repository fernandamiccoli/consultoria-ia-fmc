type BrandMarkProps = {
  className?: string;
  label?: boolean;
};

export function BrandMark({ className = "", label = false }: BrandMarkProps) {
  return (
    <span className={`brand-lockup ${className}`} aria-label="Consultoría IA FMC">
      <svg className="brand-symbol" viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="28" />
        <path d="M18 42c16-2 27-14 31-28-14 4-26 15-28 31" />
        <path d="M30 34l10-10" />
        <path d="M31 35l7 10" />
        <path d="M29 36l-9-6" />
      </svg>
      {label ? <span>Consultoría IA FMC</span> : null}
    </span>
  );
}
