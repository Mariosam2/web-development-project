interface AnimatedCloseButtonProps {
  className?: string;
  barClassName?: string;
  isActive: boolean;
  onClick?: () => void;
}

export const AnimatedCloseButton = ({ className, barClassName, isActive, onClick }: AnimatedCloseButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center will-change-transform group ${className ?? ""}`}>
      <div className="relative w-5 h-5  will-change-transform">
        <span
          className={`absolute left-0 w-full h-0.5 rounded-full will-change-transform transition-all duration-250 ease-out origin-center
            ${barClassName ?? "bg-c-dark"}
            ${isActive ? "top-1/2 -translate-y-1/2 rotate-45 delay-300 opacity-100" : "top-1 rotate-0 opacity-0"}`}
        />
        <span
          className={`absolute left-0 w-full h-0.5 rounded-full will-change-transform transition-all duration-250 ease-out origin-center
            ${barClassName ?? "bg-c-dark"}
            ${isActive ? "top-1/2 -translate-y-1/2 -rotate-45 delay-300 opacity-100" : "bottom-1 rotate-0 opacity-0"}`}
        />
      </div>
    </button>
  );
};
