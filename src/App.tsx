import { Link, Outlet, useLocation } from "react-router-dom";
import NavBarStatus, { type PathObject } from "./components/utils/NavBarStatus";

function App() {
  const { pathname } = useLocation();

  /**
   * Renders the footer component with a contextual "Add" button,
   * unless the user is on the calendar page OR a registration page.
   */
  const RegisterButtonFooter = (path: string) => {
    if (path.startsWith("/calendario") || path.startsWith("/cadastro-")) {
      return null;
    }

    const isEventPath = path.startsWith("/evento/");
    const buttonText = isEventPath ? "Adicionar Evento" : "Adicionar Material";
    const buttonLink = isEventPath ? "/cadastro-evento" : "/cadastro-material";

    return (
      <footer className="bg-emerald-950 border-t border-emerald-800 p-4 shadow-inner">
        <div className="flex justify-end">
          <Link
            className="inline-block bg-emerald-400 text-emerald-950 font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:ring-offset-2 transition-colors duration-200 text-lg"
            to={buttonLink}
          >
            {buttonText}
          </Link>
        </div>
      </footer>
    );
  };

  const tabPaths: PathObject[] = [
    {
      name: "Eventos",
      path: "/evento",
      end: false,
    },
    {
      name: "Materiais",
      path: "/material",
      end: false,
    },
    {
      name: "Calendario",
      path: "/calendario",
    },
  ];

  return (
    <>
      <div className="bg-black min-h-screen flex flex-col">
        <header className="p-1 bg-emerald-950 border-b border-emerald-800 shadow-md">
          <NavBarStatus paths={tabPaths} />
        </header>

        <main className="flex-1 grow p-4 md:p-6 lg:p-8 bg-teal-800">
          <Outlet />
        </main>

        {RegisterButtonFooter(pathname)}
      </div>
    </>
  );
}

export default App;
