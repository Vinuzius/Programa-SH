import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/utils/Button";
import MaterialFormsSection from "../components/Material/MaterialFormsSection";
import type { CreateMaterialDTO } from "../dto/CreateMaterialDTO";

const getEventosFromMaterial = (): CreateMaterialDTO[] => {
  try {
    const storedMaterial = localStorage.getItem("material");
    return storedMaterial ? JSON.parse(storedMaterial) : [];
  } catch (error) {
    console.error("Failed to parse material from localStorage", error);
    return [];
  }
};

const CadastroMaterialPage = () => {
  const navigate = useNavigate();

  const [material, setMaterial] = useState<CreateMaterialDTO>({
    id: -1,
    nome: "",
    stock_quantity: 0,
    using_quantity: 0,
    repair_quantity: 0,
  });

  // Funções
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    {
      /* fazer validação de texto depois */
    }
    const { name, value } = event.target;
    setMaterial((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const valor = parseFloat(value);

    if (!isNaN(valor)) {
      setMaterial((prevState) => ({
        ...prevState,
        [name]: valor,
      }));
    }
  };

  const resetAdvancedOptions = () => {
    setMaterial((prev) => ({
      ...prev,
      using_quantity: 0,
      repair_quantity: 0,
    }));
  };

  const handleClickAddMaterial = () => {
    if (
      material.nome.trim() === "" ||
      (material.stock_quantity === 0 &&
        material.repair_quantity === 0 &&
        material.using_quantity === 0)
    )
      return alert("Preencha todos campos obrigatórios");

    const savedMaterialStorage = getEventosFromMaterial();
    const finalMaterial = {
      ...material,
      id: savedMaterialStorage.length + 1,
    };

    let savedMateriais: CreateMaterialDTO[] = [];
    if (Array.isArray(savedMaterialStorage)) {
      savedMateriais = savedMaterialStorage;
    }

    const newMaterialList = [...savedMateriais, finalMaterial];
    localStorage.setItem("material", JSON.stringify(newMaterialList));
    console.log("Material Adicionado: ", finalMaterial);
    navigate("/material/stock");
  };

  return (
    // Main page wrapper with a dark green background
    <div className="flex min-h-screen flex-col bg-emerald-950 text-emerald-100">
      {/* Main content area grows to push footer down */}
      <main className="flex-grow p-4 md:p-8">
        <MaterialFormsSection
          resetAdvancedOptions={resetAdvancedOptions}
          material={material}
          handleTextChange={handleTextChange}
          handleNumberChange={handleNumberChange}
        />
      </main>

      {/* Footer with a dark green border and slightly darker background */}
      <footer className="sticky bottom-0 w-full border-t border-emerald-800 bg-emerald-900 p-4 shadow-sm">
        {/* Aligns buttons with the form card */}
        <div className="mx-auto flex max-w-lg items-center justify-between">
          {/* --- Secondary Button (New Style) --- */}
          {/* A more subtle, darker button that recedes */}
          <Button
            className="rounded-md bg-emerald-800 px-4 py-2 text-base font-medium text-emerald-100
                       shadow-sm
                       hover:bg-emerald-700
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            onClick={() => navigate(-1)}
          >
            Retornar sem Salvar
          </Button>

          {/* --- Primary Button (New Style) --- */}
          {/* A brighter, high-contrast button that pops */}
          <Button
            className="rounded-md bg-emerald-800 px-4 py-2 text-base font-medium text-emerald-100
                       shadow-sm
                       hover:bg-emerald-700
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            onClick={handleClickAddMaterial}
          >
            Adicionar Material
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default CadastroMaterialPage;
