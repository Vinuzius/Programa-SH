import {
  Fieldset,
  Field,
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  Input,
  Button,
  Label, // <-- IMPORTED Label
} from "@headlessui/react";
import { ChevronDownIcon, CheckIcon } from "lucide-react";
import { useState, useMemo } from "react"; // <-- IMPORTED useMemo
import type { CreateMaterialDTO } from "../../dto/CreateMaterialDTO";

interface MaterialSectionProps {
  material: CreateMaterialDTO[];
  onClickAddMaterial: (materialNovo: CreateMaterialDTO, quant: number) => void;
}

const getMaterialFromStorage = (): CreateMaterialDTO[] => {
  try {
    const storedMaterial = localStorage.getItem("material");
    return storedMaterial ? JSON.parse(storedMaterial) : [];
  } catch (error) {
    console.error("Failed to parse material from localStorage", error);
    return [];
  }
};

const MaterialSection: React.FC<MaterialSectionProps> = ({
  material,
  onClickAddMaterial,
}) => {
  // --- PERFORMANCE FIX ---
  // We use useMemo to cache the localStorage call.
  // This list is now fetched only ONCE, not on every render.
  const allMaterials = useMemo(() => getMaterialFromStorage(), []);

  const [query, setQuery] = useState("");
  const [materialSelecioando, setMaterialSelecioando] =
    useState<CreateMaterialDTO>({
      id: 0,
      nome: "",
      stock_quantity: 0,
      using_quantity: 0,
      repair_quantity: 0,
    });
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(1);

  const filteredMaterial =
    query === ""
      ? allMaterials
      : allMaterials.filter((material) => {
          return material.nome.toLowerCase().includes(query.toLowerCase());
        });

  // --- STYLING CONSTANTS ---
  // Re-using the light-gray input style
  const inputBaseClasses = [
    "w-full",
    "rounded-md",
    "border",
    "px-4 py-2",
    "text-gray-900", // Dark text *inside* the light gray input
    "bg-stone-300", // Light gray input background
    "border-gray-300",
    "placeholder:text-gray-400",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-green-800", // <-- CHANGED: A brighter green for good contrast
    "focus:border-transparent",
  ].join(" ");

  return (
    // The dark green card
    <Fieldset
      className={
        "max-w-xl space-y-6 rounded-lg bg-green-950 p-8 shadow-lg w-full"
      }
      key={"material-section"}
    >
      <h1 className="text-center text-3xl font-bold text-white">Materiais</h1>

      {/* Input section with proper grid layout */}
      <div className="grid grid-cols-3 gap-4">
        {/* Combobox Field (Material) */}
        <Field className="col-span-2 flex flex-col">
          <Label className="mb-1 text-sm font-medium text-white">
            Material:
          </Label>
          <Combobox
            value={materialSelecioando}
            onChange={(value) => {
              if (value) {
                // --- BUG/UX FIX ---
                // 1. Set the full material object
                setMaterialSelecioando(value);
                // 2. Reset quantity to 1
                setQuantidadeSelecionada(1);
              }
            }}
            onClose={() => setQuery("")}
          >
            {/* Wrapper to style the Combobox like an Input */}
            <div className="relative">
              <ComboboxInput
                displayValue={(m: CreateMaterialDTO) => m?.nome}
                onChange={(event) => setQuery(event.target.value)}
                className={inputBaseClasses} // Apply standard style
                placeholder="Procurar material..."
              />
              <ComboboxButton className="group absolute inset-y-0 right-0 flex items-center px-2.5">
                <ChevronDownIcon className="size-5 text-gray-500 group-hover:text-gray-700" />
              </ComboboxButton>
            </div>

            {/* Styled Dropdown Options */}
            <ComboboxOptions
              anchor="bottom"
              transition
              className="mt-1 max-h-60 w-[var(--input-width)] overflow-auto rounded-md bg-white p-1 shadow-lg [--anchor-gap:var(--spacing-1)] focus:outline-none"
            >
              {filteredMaterial.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nenhum material encontrado.
                </div>
              ) : (
                filteredMaterial.map((m) => (
                  <ComboboxOption
                    className="group flex cursor-default select-none items-center gap-2 rounded-md px-3 py-2 data-[focus]:bg-green-100 data-[focus]:text-green-900"
                    key={m.id}
                    // --- BUG FIX ---
                    // Pass the whole object, not just id/nome
                    value={m}
                  >
                    <CheckIcon className="invisible size-5 group-data-selected:visible" />
                    {m.nome}
                  </ComboboxOption>
                ))
              )}
            </ComboboxOptions>
          </Combobox>
        </Field>

        {/* Quantity Field */}
        <Field className="col-span-1 flex flex-col">
          <Label className="mb-1 text-sm font-medium text-white">Quant:</Label>
          <Input
            name="quantidade"
            key={materialSelecioando.id} // This key resets the input, which is good
            type="number"
            placeholder="Quant"
            className={inputBaseClasses} // Apply standard style
            min={1}
            max={materialSelecioando.stock_quantity}
            value={quantidadeSelecionada}
            onChange={(e) => setQuantidadeSelecionada(parseInt(e.target.value))}
          />
        </Field>
      </div>

      {/* Styled List of Added Materials */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-white">
          Materiais Adicionados:
        </Label>
        <div className="max-h-40 overflow-y-auto rounded-md border border-green-700 bg-green-800 p-2">
          {material.length === 0 ? (
            <p className="text-center text-sm text-green-300">
              Nenhum material adicionado.
            </p>
          ) : (
            material.map((m) => (
              <div
                key={m.id}
                className="flex justify-between rounded p-2 text-green-100"
              >
                <span>{m.nome}</span>
                {/* We don't have the quantity here, just the stock.
                    This component only *adds* materials, it doesn't store the *added* quantity.
                    The parent component needs to pass this.
                    For now, I will just show the name.
                */}
                <span>{m.nome}</span>
                {/* <span>x {m.stock_quantity}</span> // This is probably wrong */}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Styled "Add" Button */}
      <Button
        onClick={() =>
          onClickAddMaterial(materialSelecioando, quantidadeSelecionada)
        }
        className="w-full rounded-md bg-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-900"
      >
        Adicionar Material
      </Button>
    </Fieldset>
  );
};

export default MaterialSection;
