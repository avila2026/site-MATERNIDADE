import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className, ...props }) => {
  const baseStyle = "px-6 py-3 rounded-full text-sm uppercase tracking-widest font-medium transition-colors";
  const variants = {
    primary: "bg-[#4C0519] text-white hover:bg-[#881337]",
    secondary: "bg-[#FDA4AF] text-white hover:bg-[#F4C2C2]",
    outline: "bg-transparent border border-[#4C0519] text-[#4C0519] hover:bg-[#4C0519] hover:text-white"
  };
  
  return <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props} />;
};
