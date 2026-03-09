interface FiltersIconProps {
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  count?: number;
}
export const FiltersIcon = ({ className, onClick, count, disabled }: FiltersIconProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`relative inline-block ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className={className}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
        />
      </svg>

      {count !== undefined && count > 0 && (
        <span
          className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold"
          style={{ backgroundColor: "var(--color-c-yellow)", color: "var(--color-c-dark)" }}>
          {count}
        </span>
      )}
    </button>
  );
};
