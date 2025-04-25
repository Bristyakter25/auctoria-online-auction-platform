import React, { useState } from "react";

export const Tabs = ({ defaultValue, children }) => {
  const [active, setActive] = useState(defaultValue);
  const context = { active, setActive };
  return (
    <div>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { context })
      )}
    </div>
  );
};

export const TabsList = ({ children, className = "", context }) => (
  <div
    className={`${className} flex space-x-2 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 p-1`}
  >
    {children}
  </div>
);

export const TabsTrigger = ({ value, children, context, className = "" }) => (
  <button
    className={`${className} ${
      context?.active === value ? "bg-white/20" : ""
    } flex-1 py-2 px-4 rounded-xl text-white hover:bg-white/10`}
    onClick={() => context?.setActive(value)}
  >
    {children}
  </button>
);

export const TabsContent = ({ value, children, context }) => {
  if (context?.active !== value) return null;
  return (
    <div className="p-4 mt-4 rounded-xl text-white bg-white/10">{children}</div>
  );
};
