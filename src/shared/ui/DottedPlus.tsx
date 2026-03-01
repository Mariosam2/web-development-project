interface DottedPlusProps {
  className?: string;
}
export const DottedPlus = ({ className }: DottedPlusProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={className}>
      <path d="M10 30 L10 15 Q10 10 15 10 L30 10" fill="none" stroke="#d4d4d4" strokeWidth="8" strokeLinecap="round" />
      <path d="M70 10 L85 10 Q90 10 90 15 L90 30" fill="none" stroke="#d4d4d4" strokeWidth="8" strokeLinecap="round" />
      <path d="M10 70 L10 85 Q10 90 15 90 L30 90" fill="none" stroke="#d4d4d4" strokeWidth="8" strokeLinecap="round" />
      <path d="M70 90 L85 90 Q90 90 90 85 L90 70" fill="none" stroke="#d4d4d4" strokeWidth="8" strokeLinecap="round" />
      <line x1="36" y1="50" x2="64" y2="50" stroke="#d4d4d4" strokeWidth="8" strokeLinecap="round" />
      <line x1="50" y1="36" x2="50" y2="64" stroke="#d4d4d4" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
};
