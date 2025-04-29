type CardProps = {
  children: React.ReactNode;
  className?: string;
};
const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={`bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-6 sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
