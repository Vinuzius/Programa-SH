import { twMerge } from "tailwind-merge";

interface TabButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  active: string;
  onTabClick: (tab: string) => void;
  icon?: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({
  name,
  className,
  onTabClick,
  active,
  icon,
  ...rest
}) => {
  const isActive = active === name ? "border-4" : "";
  const mergedClasses = twMerge(
    "bg-white rounded-md p-4 border-1 hover:bg-slate-200 flex items-center gap-2",
    className,
    isActive
  );

  return (
    <button
      {...rest}
      className={mergedClasses}
      onClick={() => onTabClick(name)}
    >
      {name}
      {icon}
    </button>
  );
};

export default TabButton;
