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
} from "@headlessui/react";
import { ChevronDownIcon, CheckIcon } from "lucide-react";
import { useState } from "react";
import type { CreateMaterialDTO } from "../../dto/CreateMaterialDTO";

interface MaterialSectionProps {
  material: CreateMaterialDTO[];
  onClickAddMaterial: (materialNovo: CreateMaterialDTO, quant: number) => void;
}

const MateriaisExemplo: CreateMaterialDTO[] = [
  { id: 1, nome: "Caixa de Som X", quantidade: 10 },
  { id: 2, nome: "Pé com borracha Y", quantidade: 4 },
  { id: 3, nome: "Material Z sem borracha", quantidade: 5 },
];

const MaterialSection: React.FC<MaterialSectionProps> = ({
  material,
  onClickAddMaterial,
}) => {
  const [query, setQuery] = useState("");

  const [materialSelecioando, setMaterialSelecioando] =
    useState<CreateMaterialDTO>({
      id: 0,
      nome: "",
      quantidade: 0,
    });
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(1);

  const filteredMaterial =
    query === ""
      ? MateriaisExemplo
      : MateriaisExemplo.filter((material) => {
          return material.nome.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Fieldset className={"space-y-2"}>
      <h1 className="text-center text-3xl font-bold">Materiais</h1>

      <Field className={"flex gap-10"}>
        <Combobox
          value={materialSelecioando}
          onChange={(value) => {
            if (value) setMaterialSelecioando(value);
          }}
          onClose={() => setQuery("")}
        >
          <div className="relative bg-white rounded-md border">
            <ComboboxInput
              displayValue={(m: CreateMaterialDTO) => m?.nome}
              onChange={(event) => setQuery(event.target.value)}
            />
            <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
              <ChevronDownIcon className="size-4 " />
            </ComboboxButton>
          </div>

          <ComboboxOptions
            anchor="bottom"
            transition
            className="border empty:invisible w-(--input-width)"
          >
            {filteredMaterial.map((m) => (
              <ComboboxOption
                className="group flex gap-2 bg-white data-focus:bg-blue-100"
                key={m.id}
                value={{ id: m.id, nome: m.nome }}
              >
                <CheckIcon className="invisible size-5 group-data-selected:visible" />
                {m.nome}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </Combobox>

        <Input
          name="quantidade"
          key={materialSelecioando.id}
          type="number"
          placeholder=" Quant"
          className={"bg-white border rounded-md w-20"}
          min={1}
          max={materialSelecioando.quantidade}
          value={quantidadeSelecionada}
          onChange={(e) => setQuantidadeSelecionada(parseInt(e.target.value))}
        />
      </Field>

      {material.map((m) => {
        return (
          <p key={m.id}>
            {m.nome} - {m.quantidade}{" "}
          </p>
        );
      })}
      <Button
        onClick={() =>
          onClickAddMaterial(materialSelecioando, quantidadeSelecionada)
        }
        className="bg-white text-center font-bold text-2xl border p-1 "
      >
        +
      </Button>
    </Fieldset>
  );
};

export default MaterialSection;
