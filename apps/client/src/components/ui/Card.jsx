export const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
