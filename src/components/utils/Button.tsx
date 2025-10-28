import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...rest }) => {
  const mergedClasses = twMerge(
    "bg-white rounded-md p-4 border-1 hover:bg-slate-200",
    className
  );

  return (
    <button {...rest} className={mergedClasses}>
      {children}
    </button>
  );
};

export default Button;
