import { Archive, Wallet, Search } from "lucide-react";
import TabButton from "./TabButton";
import type { CreateEventoDto } from "../dto/CreateEventoDTO";

interface Tab {
  name: string;
  icon?: React.ReactNode;
}

interface EventosProps {
  EventosAtivos: CreateEventoDto;
  Status: Tab[];
  activeStatus: string;
  onStatusClick: (status: string) => void;
}

const Eventos: React.FC<EventosProps> = ({
  EventosAtivos,
  Status,
  activeStatus,
  onStatusClick,
}) => {
  return (
    <>
      {/* 2. Status Filter Section */}
      <div className="flex gap-2">
        {
          /* Map do Status da pagina Evento */
          Status.map((statusName) => (
            <TabButton
              key={statusName.name}
              name={statusName.name}
              active={activeStatus}
              onTabClick={onStatusClick}
              icon={statusName.icon}
            />
          ))
        }
      </div>

      {/* 3. Main Content Section */}
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
            <li className="flex justify-between gap-2 bg-slate-100 w-full p-2 rounded-md border border-gray-900">
              <div> Evento {EventosAtivos.nome}</div>

              <div className="flex gap-2">
                <p>{EventosAtivos.dataInicio}</p>
                <Wallet />
                <Archive />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Eventos;
