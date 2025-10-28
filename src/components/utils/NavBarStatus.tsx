import { NavLink } from "react-router-dom";

// 1. Add 'end?: boolean' to the interface
export interface PathObject {
  name: string;
  path: string;
  icon?: React.ReactNode;
  end?: boolean; // <-- ADD THIS LINE
}

// 2. Define the props for the new component
interface StatusNavBarProps {
  paths: PathObject[];
}

// --- Styles (no change) ---
const navStyleBase =
  "flex items-center gap-3 rounded-lg px-4 py-3 text-lg font-semibold shadow-md transition-all duration-200 ease-in-out";
const navStyleInactive = "bg-emerald-800 text-emerald-100 hover:bg-emerald-700";
const navStyleActive = "bg-emerald-400 text-emerald-950 shadow-lg scale-105";

function StatusNavBar({ paths }: StatusNavBarProps) {
  return (
    <nav>
      <ul className="flex gap-4 p-1">
        {paths.map((p) => (
          <li key={p.name}>
            <NavLink
              to={p.path}
              // 3. Pass the 'end' prop to NavLink.
              // If 'end' isn't provided, it defaults to 'true' (exact match).
              // If we provide 'end: false', it matches parent routes.
              end={p.end === undefined ? true : p.end} // <-- ADD THIS LINE
              className={({ isActive }) =>
                `${navStyleBase} ${
                  isActive ? navStyleActive : navStyleInactive
                }`
              }
            >
              {p.icon}
              <span>{p.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default StatusNavBar;
