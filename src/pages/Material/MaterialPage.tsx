import { ChevronDown, Search, Archive, Wrench, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { CreateMaterialDTO } from "../../dto/CreateMaterialDTO";
import NavBarStatus, { type PathObject } from "../../components/NavBarStatus";
import type { CreateEventoDto } from "../../dto/CreateEventoDTO";

const getMaterialFromStorage = (): CreateMaterialDTO[] => {
  // ... (lógica inalterada)
  try {
    const storedMaterial = localStorage.getItem("material");
    return storedMaterial ? JSON.parse(storedMaterial) : [];
  } catch (error) {
    console.error("Failed to parse material from localStorage", error);
    return [];
  }
};

const getEventosFromStorage = (): CreateEventoDto[] => {
  // ... (lógica inalterada)
  try {
    const storedEvento = localStorage.getItem("evento");
    return storedEvento ? JSON.parse(storedEvento) : [];
  } catch (error) {
    console.error("Failed to parse evento from localStorage", error);
    return [];
  }
};

const materialPaths: PathObject[] = [
  // ... (lógica inalterada)
  {
    name: "Em Galpão",
    path: "/material/stock",
    icon: <Archive className="h-5 w-5" />,
  },
  {
    name: "Delegado",
    path: "/material/using",
    icon: <Truck className="h-5 w-5" />,
  },
  {
    name: "Reparo",
    path: "/material/fix",
    icon: <Wrench className="h-5 w-5" />,
  },
];

const MaterialPage = () => {
  // ... (lógica de state e handlers inalterada)
  const { status } = useParams<{ status?: string }>();
  const [MateriaisTotais] = useState<CreateMaterialDTO[]>(
    getMaterialFromStorage()
  );
  const [expandId, setExpandId] = useState<number[]>([]);
  const [searchMaterial, setSearchMaterial] = useState<string>("");

  const MaterialFiltrado = MateriaisTotais.filter((material) => {
    const matchesSearch = material.nome
      .toLowerCase()
      .includes(searchMaterial.toLowerCase());
    if (!matchesSearch) return false;
    switch (status) {
      case "stock":
        return material.stock_quantity > 0;
      case "using":
        return material.using_quantity > 0;
      case "fix":
        return material.repair_quantity > 0;
      default:
        return false;
    }
  });

  const getQuantity = (material: CreateMaterialDTO) => {
    switch (status) {
      case "stock":
        return material.stock_quantity;
      case "using":
        return material.using_quantity;
      case "fix":
        return material.repair_quantity;
      default:
        return 0;
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchMaterial(e.target.value);
  };

  const onClickUsing = (material: number) => {
    setExpandId((prev) => {
      if (!prev.includes(material)) return [...prev, material];
      return prev.filter((id) => id !== material);
    });
  };

  const showEventsUsing = (material: CreateMaterialDTO) => {
    // ... (lógica inalterada)
    const eventosUsing = getEventosFromStorage().filter((ev) =>
      ev.materiais.map((m) => m.id).includes(material.id)
    );
    if (eventosUsing.length === 0) {
      return (
        // MUDANÇA: Cor do texto
        <p className="text-gray-400 italic">
          Nenhum evento está usando este material no momento.
        </p>
      );
    }
    return (
      <ul className="space-y-2 list-disc list-inside">
        {eventosUsing.map((ev) => (
          // MUDANÇA: Cor do texto
          <li key={ev.id} className="text-gray-400">
            {ev.nome} ({ev.dataInicio}) - {/* MUDANÇA: Cor do texto */}
            <span className="font-medium text-gray-100">
              Qtd: {ev.materiais.find((m) => m.id === material.id)?.quantidade}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  useEffect(() => {
    localStorage.setItem("material", JSON.stringify(MateriaisTotais));
  }, [MateriaisTotais]);

  return (
    <div className="flex flex-col grow">
      <div className="mb-4">
        <NavBarStatus paths={materialPaths} />
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
              placeholder="Pesquisar material por nome..."
              className="block w-full rounded-md border border-emerald-700 bg-stone-300
                         py-2 pl-10 pr-3 text-gray-900 placeholder-gray-900
                         focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              onChange={handleSearchChange}
              value={searchMaterial}
            />
          </div>
        </div>

        {/* --- Material List --- */}
        <div className="flex-grow">
          {MaterialFiltrado.length === 0 ? (
            // --- Empty State ---
            <div className="flex h-40 items-center justify-center rounded-md border border-dashed border-emerald-800 bg-emerald-900">
              {/* MUDANÇA: Cor do texto */}
              <p className="text-gray-400">Nenhum material encontrado.</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {MaterialFiltrado.map((material) => (
                // --- List Item (Fundos inalterados) ---
                <li
                  key={material.id}
                  className="bg-emerald-950 rounded-lg border border-emerald-800 shadow-md overflow-hidden transition-colors hover:bg-emerald-800"
                >
                  {/* Cabeçalho do Card */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
                    {/* MUDANÇA: Cor do texto */}
                    <p className="font-medium text-gray-100">{material.nome}</p>

                    <div className="flex items-center gap-4">
                      {/* MUDANÇA: Cor do texto */}
                      <p className="text-md text-gray-400">
                        {getQuantity(material)} em{" "}
                        {status === "stock"
                          ? "Galpão"
                          : status === "using"
                          ? "Delegado"
                          : "Reparo"}
                      </p>
                      {status === "using" ? (
                        // --- Botão (Hover azul inalterado) ---
                        <button
                          title="Ver eventos"
                          onClick={() => onClickUsing(material.id)}
                          // MUDANÇA: Cor do ícone
                          className="p-2.5 rounded-full text-gray-400 
                                     hover:bg-blue-600 hover:text-white
                                     focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <ChevronDown
                            className={`h-5 w-5 transition-transform duration-200 ${
                              expandId.includes(material.id) ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      ) : null}
                    </div>
                  </div>

                  {/* Conteúdo Expandido (Fundo inalterado) */}
                  {status === "using" && expandId.includes(material.id) ? (
                    <div className="p-4 border-t border-emerald-800 bg-emerald-800">
                      {showEventsUsing(material)}
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MaterialPage;
