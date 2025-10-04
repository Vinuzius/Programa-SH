import { Archive, Wallet, Search } from "lucide-react";
import type { CreateEventoDto } from "../dto/CreateEventoDTO";
import NavBarStatusEvento from "../components/NavBar/NavBarStatusEvento";
import { useParams } from "react-router-dom";

const getEventosFromStorage = (): CreateEventoDto[] => {
  try {
    const storedEvento = localStorage.getItem("evento");
    return storedEvento ? JSON.parse(storedEvento) : [];
  } catch (error) {
    console.error("Failed to parse evento from localStorage", error);
    return [];
  }
};

const EventosPage = () => {
  const { status } = useParams<{ status?: string }>();

  const EventosTotais = getEventosFromStorage();
  const EventoFiltrado = EventosTotais.filter(
    (evento) => evento.status === status
  );

  return (
    <>
      {/* Status Filter Section */}
      <div className="flex gap-2">
        <NavBarStatusEvento />
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col flex-grow border rounded-lg">
        {/* Search Bar */}
        <div className="flex justify-end p-2">
          <input
            type="text"
            placeholder="Pesquisar..."
            className="bg-white px-2 py-1 rounded-md border border-y-gray-900 text-sm"
          />
          <Search />
        </div>

        {/* Event List */}
        <div className="space-y-1 flex-grow">
          <ul className="space-y-3 p-2">
            {/* Depois vai passar pelo banco de dados, apenas exemplos*/}
            {EventoFiltrado.map((ev) => (
              <li className="flex justify-between gap-2 bg-slate-100 w-full p-2 rounded-md border border-gray-900">
                <div> Evento {ev.nome}</div>

                <div className="flex gap-2">
                  <p>{ev.dataInicio}</p>
                  <Wallet />
                  <Archive />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default EventosPage;
