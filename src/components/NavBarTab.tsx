import { NavLink } from "react-router-dom";

interface PathObject {
  name: string;
  path: string;
}

const paths: PathObject[] = [
  { name: "Eventos", path: "/" },
  { name: "Materiais", path: "/materiais" },
  { name: "Calendario", path: "/calendario" },
];

const navStyle =
  "bg-white rounded-md p-4 hover:bg-slate-200 flex items-center gap-2";

function NavBarTab() {
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
                {p.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default NavBarTab;
