export const CardContent = ({ children, className = "" }) => {
  return (
    <div className={`bg-white/10 rounded-xl ${className}`}>{children}</div>
  );
};
