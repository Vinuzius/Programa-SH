import { Link, Outlet } from "react-router-dom";
import NavBarTab from "./components/NavBarTab";
import { Archive, Wallet } from "lucide-react";
import { useState } from "react";
import type { CreateEventoDto } from "./dto/CreateEventoDTO";

function App() {
  const EventosAtivos: CreateEventoDto = JSON.parse(
    localStorage.getItem("evento") || "{}"
  );

  interface Tab {
    name: string;
    icon?: React.ReactNode;
  }

  const Status: Tab[] = [
    { name: "Em Andamento" },
    { name: "Arquivado", icon: <Archive /> },
    { name: "Receber", icon: <Wallet /> },
  ];
  const [activeStatus, setActiveStatus] = useState(Status[0].name);
  const onStatusClick = (status: string) => {
    setActiveStatus(status);
  };
  return (
    <>
      <div className="bg-slate-300 min-h-screen flex flex-col border p-1">
        <div className="flex-grow flex flex-col space-y-2">
          {/* 1. Top Navigation Section */}
          <NavBarTab />
        </div>

        <Outlet />

        {/*4. Footer Section */}
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
