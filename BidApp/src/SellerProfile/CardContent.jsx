export const CardContent = ({ children, className = "" }) => {
  return (
    <div className={`p-4 bg-white/10 rounded-xl ${className}`}>{children}</div>
  );
};
