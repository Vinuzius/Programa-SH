import { useState } from "react";
import Button from "./components/Button";
import TabButton from "./components/TabButton";
import { Archive, Search, Wallet } from "lucide-react";

function App() {
  interface Tab {
    name: string;
    icon?: React.ReactNode;
  }

  const Options: Tab[] = [
    { name: "Eventos" },
    { name: "Materiais" },
    { name: "Calendario" },
  ];
  const [activeTab, setActiveTab] = useState(Options[0].name);
  const onTabClick = (tab: string) => {
    setActiveTab(tab);
  };

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
          <div className="flex gap-4 border-1 rounded-md p-3 text-2xl">
            {Options.map((optionName) => (
              <TabButton
                key={optionName.name}
                name={optionName.name}
                active={activeTab}
                icon={optionName.icon}
                onTabClick={onTabClick}
              />
            ))}
          </div>

          {/* 2. Status Filter Section */}
          <div className="flex gap-2">
            {Status.map((statusName) => (
              <TabButton
                key={statusName.name}
                name={statusName.name}
                active={activeStatus}
                onTabClick={onStatusClick}
                icon={statusName.icon}
              />
            ))}
          </div>

          {/* 3. Main Content Section */}
          <div className="flex flex-col flex-grow border rounded-lg">
            <div className="flex justify-end p-2">
              <input
                type="text"
                placeholder="Pesquisar..."
                className="bg-white px-2 py-1 rounded-md border border-y-gray-900 text-sm"
              />
              <Search />
            </div>

            <div className="space-y-1 flex-grow">
              <ul className="space-y-3 p-2">
                {/* Depois vai passar pelo banco de dados, apenas exemplos*/}
                <li className="flex justify-between gap-2 bg-slate-100 w-full p-2 rounded-md border border-gray-900">
                  <div> Evento 001</div>

                  <div className="flex gap-2">
                    <p>25/09/2025 11:30</p>
                    <Wallet />
                    <Archive />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/*4. Footer Section */}
        <div className="bg-white border-1 p-3 rounded-md">
          <div className="flex justify-end">
            <Button className="bg-slate-100 rounded-md border-2 p-2 text-2xl">
              Adicionar Evento
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
