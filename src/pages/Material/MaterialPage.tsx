import { ChevronDown, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBarStatusMaterial from "../../components/NavBar/NavBarStatusMaterial";
import type { CreateMaterialDTO } from "../../dto/CreateMaterialDTO";
import Button from "../../components/Button";

const getMaterialFromStorage = (): CreateMaterialDTO[] => {
  try {
    const storedMaterial = localStorage.getItem("material");
    return storedMaterial ? JSON.parse(storedMaterial) : [];
  } catch (error) {
    console.error("Failed to parse material from localStorage", error);
    return [];
  }
};

const MaterialPage = () => {
  const { status } = useParams<{ status?: string }>();

  const [MateriaisTotais] = useState<CreateMaterialDTO[]>(
    getMaterialFromStorage()
  );

  const [expandId, setExpandId] = useState<number[]>([]);

  const [searchMaterial, setSearchMaterial] = useState<string>("");

  const MaterialFiltrado = MateriaisTotais.filter((material) => {
    // ----- FILTRO DE PESQUISA -----
    const matchesSearch = material.nome
      .toLowerCase()
      .includes(searchMaterial.toLowerCase());
    if (!matchesSearch) return false;

    // ----- FILTRO DE STATUS -----
    // Se corresponder à pesquisa, ENTÃO verificamos o status.
    switch (status) {
      case "stock":
        return material.stock_quantity > 0;

      case "using":
        return material.using_quantity > 0;

      case "fix":
        return material.repair_quantity > 0;

      default:
        // Se a URL for algo desconhecido, não mostre nada
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
        return false;
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

  // apenas enquanto estou usando localStorage
  useEffect(() => {
    localStorage.setItem("material", JSON.stringify(MateriaisTotais));
  }, [MateriaisTotais]);

  return (
    <div className="flex flex-col grow">
      <div className="gap-2">
        <NavBarStatusMaterial />
      </div>

      <div className="flex flex-col flex-grow border rounded-lg">
        {/* Search Bar */}
        <div className="flex justify-end p-2">
          <input
            type="text"
            placeholder="Pesquisar..."
            className="bg-white px-2 py-1 rounded-md border border-y-gray-900 text-sm"
            onChange={handleSearchChange}
            value={searchMaterial}
          />
          <Search />
        </div>

        <div className="space-y-1 flex-grow">
          <ul className="space-y-3 p-2">
            {MaterialFiltrado.map((material) => (
              <li className="flex justify-between gap-2 bg-slate-100 w-full p-2 rounded-md border border-gray-900">
                <p>
                  {material.nome} - {getQuantity(material)}{" "}
                  {status === "using" ? (
                    <>
                      <Button onClick={() => onClickUsing(material.id)}>
                        <ChevronDown />
                      </Button>
                    </>
                  ) : null}
                  {status === "using" && expandId.includes(material.id) ? (
                    <>
                      <h1> list of materials </h1>
                    </>
                  ) : null}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MaterialPage;
