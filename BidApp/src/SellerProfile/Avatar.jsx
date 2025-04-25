export const Avatar = ({ children, className = "" }) => {
  return (
    <div className={`rounded-full overflow-hidden w-12 h-12 ${className}`}>
      {children}
    </div>
  );
};

export const AvatarImage = ({ src, alt = "avatar" }) => {
  return <img src={src} alt={alt} className="w-full h-full object-cover" />;
};

export const AvatarFallback = ({ children }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-300 text-white">
      {children}
    </div>
  );
};
