import { Link, Outlet } from "react-router-dom";
import NavBarTab from "./components/NavBar/NavBarTab";

function App() {
  return (
    <>
      <div className="bg-slate-300 min-h-screen flex flex-col border p-1 ">
        <div className="space-y-2">
          {/* Top Navigation Section */}
          <NavBarTab />
        </div>

        <div className="grow flex flex-col">
          <Outlet />
        </div>

        {/* Footer Section */}
        <div className="bg-white border-1 p-3 rounded-md">
          <div className="flex justify-end">
            <Link
              className="bg-slate-100 rounded-md border-2 p-2 text-2xl"
              to="/cadastro-evento"
            >
              Adicionar Evento
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
