import { Archive, Wallet } from "lucide-react";
import { NavLink } from "react-router-dom";

interface PathObject {
  name: string;
  path: string;
  icon?: React.ReactNode;
}

const paths: PathObject[] = [
  { name: "Em Andamento", path: "/evento/em-andamento" },
  { name: "Arquivado", path: "/evento/arquivado", icon: <Archive /> },
  { name: "Receber", path: "/evento/receber", icon: <Wallet /> },
];

const navStyle =
  "bg-white rounded-md p-4 hover:bg-slate-200 flex items-center gap-2";

function NavBarStatusEvento() {
  return (
    <>
      <div>
        <ul className="flex gap-4 border-1 rounded-md p-3 text-2xl">
          {paths.map((p) => (
            <li key={p.name}>
              <NavLink
                to={p.path}
                className={({ isActive }) =>
                  isActive ? `${navStyle} border-4 ` : `${navStyle} border-1 `
                }
              >
                {p.name} {p.icon}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default NavBarStatusEvento;
