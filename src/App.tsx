import { Link, Outlet, useLocation } from "react-router-dom";
import NavBarTab from "./components/NavBar/NavBarTab";

function App() {
  const { pathname } = useLocation();

  const RegisterButton = (path: string) => {
    if (path.startsWith("/calendario")) return null;

    return (
      <div className="bg-white border-1 p-3 rounded-md">
        <div className="flex justify-end">
          {path.startsWith("/evento/") ? (
            <>
              <Link
                className="bg-slate-100 rounded-md border-2 p-2 text-2xl"
                to="/cadastro-evento"
              >
                Adicionar Evento
              </Link>
            </>
          ) : (
            <>
              <Link
                className="bg-slate-100 rounded-md border-2 p-2 text-2xl"
                to="/cadastro-material"
              >
                Adicionar Material
              </Link>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-slate-400 min-h-screen flex flex-col border p-1 ">
        <div className="space-y-2">
          {/* Top Navigation Section */}
          <NavBarTab />
        </div>

        <div className="grow flex flex-col">
          <Outlet />
        </div>

        {/* Footer Section */}
        {RegisterButton(pathname)}
      </div>
    </>
  );
}

export default App;
