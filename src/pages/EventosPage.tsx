import { Archive, Wallet, Search, Clock } from "lucide-react";
import type { CreateEventoDto } from "../dto/CreateEventoDTO";
import NavBarStatusEvento from "../components/NavBar/NavBarStatusEvento";
import { useParams } from "react-router-dom";
import type { EventoStatusEnum } from "../enum/EventoStatusEnum";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

  // mudar a comparação para id depois
  const handleStatusChange = (
    novoEvento: CreateEventoDto,
    novoStatus: EventoStatusEnum
  ) => {
    setEventosTotais(
      getEventosFromStorage().map((ev) => {
        if (ev.nome === novoEvento.nome) {
          return { ...ev, status: novoStatus };
        }
        return ev;
      })
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchEvento(e.target.value);
  };

  // apenas enquanto estou usando localStorage
  useEffect(() => {
    localStorage.setItem("evento", JSON.stringify(EventosTotais));
  }, [EventosTotais]);

  return (
    <div className="flex flex-col grow">
      {/* Status Filter Section */}
      <div className="gap-2">
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
            onChange={handleSearchChange}
            value={searchEvento}
          />
          <Search />
        </div>

        {/* Event List */}
        <div className="space-y-1 flex-grow">
          <ul className="space-y-3 p-2">
            {/* Depois vai passar pelo banco de dados, apenas exemplos*/}
            {EventoFiltrado.map((ev) => (
              <li className="flex justify-between gap-2 bg-slate-100 w-full p-2 rounded-md border border-gray-900">
                <Link to={"/editar/" + ev.id}>{"Evento " + ev.nome}</Link>

                {/* Botões de Status */}
                <div className="flex gap-2">
                  {ev.status !== "receber" && (
                    <button
                      onClick={() => {
                        handleStatusChange(ev, "receber");
                      }}
                    >
                      <Wallet />
                    </button>
                  )}

                  {ev.status !== "arquivado" && (
                    <button
                      onClick={() => {
                        handleStatusChange(ev, "arquivado");
                      }}
                    >
                      <Archive />
                    </button>
                  )}

                  {ev.status !== "em-andamento" && (
                    <button
                      onClick={() => {
                        handleStatusChange(ev, "em-andamento");
                      }}
                    >
                      <Clock />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EventosPage;
