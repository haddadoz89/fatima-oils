export const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  disabled = false,
  onClick,
  type = 'button',
  ...props 
}) => {
  const baseStyles = 'px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:shadow-xl hover:scale-105',
    secondary: 'bg-gradient-to-r from-gold-500 to-gold-600 text-white hover:shadow-xl hover:scale-105',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50',
    ghost: 'text-primary-600 hover:bg-primary-50',
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
