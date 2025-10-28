import { Archive, Wallet, Search, Clock } from "lucide-react";
import type { CreateEventoDto } from "../../dto/CreateEventoDTO";
import { useParams } from "react-router-dom";
import type { EventoStatusEnum } from "../../enum/EventoStatusEnum";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBarStatus, { type PathObject } from "../utils/NavBarStatus";

const getEventosFromStorage = (): CreateEventoDto[] => {
  try {
    const storedEvento = localStorage.getItem("evento");
    return storedEvento ? JSON.parse(storedEvento) : [];
  } catch (error) {
    console.error("Failed to parse evento from localStorage", error);
    return [];
  }
};

const eventoPaths: PathObject[] = [
  // ... (lógica inalterada)
  {
    name: "Em Andamento",
    path: "/evento/em-andamento",
    icon: <Clock className="h-5 w-5" />,
  },
  {
    name: "Arquivado",
    path: "/evento/arquivado",
    icon: <Archive className="h-5 w-5" />,
  },
  {
    name: "Receber",
    path: "/evento/receber",
    icon: <Wallet className="h-5 w-5" />,
  },
];

const EventosPage = () => {
  // ... (lógica de state e handlers inalterada)
  const { status } = useParams<{ status?: string }>();
  const [EventosTotais, setEventosTotais] = useState<CreateEventoDto[]>(
    getEventosFromStorage()
  );
  const [searchEvento, setSearchEvento] = useState<string>("");

  const EventoFilterStatus = EventosTotais.filter(
    (evento) => evento.status === status
  );
  const EventoFiltrado =
    searchEvento.trim() === ""
      ? EventoFilterStatus
      : EventoFilterStatus.filter((e) =>
          e.nome.toLowerCase().includes(searchEvento.toLowerCase())
        );

  const handleStatusChange = (
    novoEvento: CreateEventoDto,
    novoStatus: EventoStatusEnum
  ) => {
    setEventosTotais(
      getEventosFromStorage().map((ev) => {
        if (ev.id === novoEvento.id) {
          return { ...ev, status: novoStatus };
        }
        return ev;
      })
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchEvento(e.target.value);
  };

  useEffect(() => {
    localStorage.setItem("evento", JSON.stringify(EventosTotais));
  }, [EventosTotais]);

  return (
    <div className="flex flex-col grow">
      <div className="mb-4">
        <NavBarStatus paths={eventoPaths} />
      </div>

      <div className="flex flex-col flex-grow">
        {/* --- Search Bar (Estilo Inalterado) --- */}
        <div className="mb-4 flex w-full justify-end">
          <div className="relative w-full max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-emerald-500" />
            </div>
            <input
              type="text"
              placeholder="Pesquisar evento por nome..."
              className="block w-full rounded-md border border-emerald-700 bg-stone-300
                         py-2 pl-10 pr-3 text-gray-900 placeholder-gray-900
                         focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              onChange={handleSearchChange}
              value={searchEvento}
            />
          </div>
        </div>

        {/* --- Event List --- */}
        <div className="space-y-2 flex-grow">
          {EventoFiltrado.length === 0 ? (
            // --- Empty State ---
            <div className="flex h-40 items-center justify-center rounded-md border border-dashed border-emerald-800 bg-emerald-900">
              {/* MUDANÇA: Cor do texto */}
              <p className="text-gray-400">Nenhum evento encontrado.</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {EventoFiltrado.map((ev) => (
                <li
                  key={ev.id}
                  // --- List Item (Fundos inalterados) ---
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 
                             bg-emerald-950 w-full p-4 rounded-lg border border-emerald-800
                             transition-colors hover:bg-emerald-800"
                >
                  <Link
                    to={"/editar/" + ev.id}
                    // MUDANÇA: Cor do texto
                    className="font-medium text-gray-100 hover:text-blue-400"
                  >
                    {"Evento " + ev.nome}
                  </Link>

                  {/* Botões de Status */}
                  <div className="flex items-center gap-4">
                    {/* MUDANÇA: Cor do texto (data) */}
                    <p className="text-md text-gray-400">{ev.dataInicio}</p>

                    <div className="flex items-center gap-2">
                      {ev.status !== "receber" && (
                        <button
                          title="Marcar como 'A Receber'"
                          onClick={() => handleStatusChange(ev, "receber")}
                          // MUDANÇA: Cor do ícone
                          className="p-2.5 rounded-full text-gray-400 
                                     hover:bg-blue-600 hover:text-white
                                     focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <Wallet className="h-6 w-6" />
                        </button>
                      )}

                      {ev.status !== "arquivado" && (
                        <button
                          title="Arquivar Evento"
                          onClick={() => handleStatusChange(ev, "arquivado")}
                          // MUDANÇA: Cor do ícone
                          className="p-2.5 rounded-full text-gray-400 
                                     hover:bg-blue-600 hover:text-white
                                     focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <Archive className="h-6 w-6" />
                        </button>
                      )}

                      {ev.status !== "em-andamento" && (
                        <button
                          title="Marcar como 'Em Andamento'"
                          onClick={() => handleStatusChange(ev, "em-andamento")}
                          // MUDANÇA: Cor do ícone
                          className="p-2.5 rounded-full text-gray-400 
                                     hover:bg-blue-600 hover:text-white
                                     focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <Clock className="h-6 w-6" />
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventosPage;
