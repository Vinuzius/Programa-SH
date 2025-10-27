import { Link, Outlet, useLocation } from "react-router-dom";
// Fix: Corrected the import path. Assuming App.jsx is in the root src folder.
import NavBarStatus, { type PathObject } from "./components/NavBarStatus";

function App() {
  const { pathname } = useLocation();

  /**
   * Renders the footer component with a contextual "Add" button,
   * unless the user is on the calendar page OR a registration page.
   */
  const RegisterButtonFooter = (path: string) => {
    // !! MUDANÇA DE LÓGICA !!
    // Não mostrar o rodapé no calendário OU nas páginas de cadastro
    if (path.startsWith("/calendario") || path.startsWith("/cadastro-")) {
      return null;
    }

    const isEventPath = path.startsWith("/evento/");
    const buttonText = isEventPath ? "Adicionar Evento" : "Adicionar Material";
    const buttonLink = isEventPath ? "/cadastro-evento" : "/cadastro-material";

    return (
      // Footer bar: MUDANÇA
      // bg-emerald-950: O verde mais escuro, para ser o "frame"
      <footer className="bg-emerald-950 border-t border-emerald-800 p-4 shadow-inner">
        <div className="flex justify-end">
          <Link
            // Button style: Bright green, high-contrast
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
      {/* Main App Container: MUDANÇA
        - bg-black: Fundo "externo" neutro para ecrãs muito largos
      */}
      <div className="bg-black min-h-screen flex flex-col">
        {/* Header: MUDANÇA
          - bg-emerald-950: O verde mais escuro, para ser o "frame"
        */}
        <header className="p-1 bg-emerald-950 border-b border-emerald-800 shadow-md">
          <NavBarStatus paths={tabPaths} />
        </header>

        {/* Main Content Area: MUDANÇA
          - bg-teal-800: O fundo de conteúdo (verde-água) do seu exemplo
          - Os seus cards 'bg-emerald-900' vão destacar-se aqui.
        */}
        <main className="flex-1 grow p-4 md:p-6 lg:p-8 bg-teal-800">
          <Outlet />
        </main>

        {/* Footer Section: Controlado pela função (agora 'bg-emerald-950') */}
        {RegisterButtonFooter(pathname)}
      </div>
    </>
  );
}

export default App;
