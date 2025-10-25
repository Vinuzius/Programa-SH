import { Checkbox, Field, Fieldset, Input, Label } from "@headlessui/react";
import { Check } from "lucide-react";
import type { CreateMaterialDTO } from "../../dto/CreateMaterialDTO";
import { useEffect, useState } from "react";

interface MaterialFormsProps {
  material: CreateMaterialDTO;
  handleTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetAdvancedOptions: () => void;
}

const MaterialFormsSection: React.FC<MaterialFormsProps> = ({
  material,
  handleTextChange,
  handleNumberChange,
  resetAdvancedOptions,
}) => {
  const [advancedOptions, setAdvancedOptions] = useState<boolean>(false);

  useEffect(() => {
    if (!advancedOptions) resetAdvancedOptions();
  }, [advancedOptions]);

  return (
    <>
      {/* The card background is slate-200 */}
      <div className="max-w-lg mx-auto p-6 bg-slate-200 rounded-lg shadow-xl my-10">
        <Fieldset className="space-y-4" key="material">
          <h1 className="text-center text-3xl font-bold text-slate-800 mb-4">
            Cadastro de Material
          </h1>

          <Field className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium text-slate-700">
              Nome do Material:
            </Label>
            <Input
              type="text"
              name="nome"
              placeholder="Ex: Parafuso Sextavado 1/4"
              value={material.nome}
              onChange={handleTextChange}
              className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </Field>

          <Field className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium text-slate-700">
              Quantidade em Estoque:
            </Label>
            <Input
              type="number"
              name="stock_quantity"
              placeholder="12345"
              value={material.stock_quantity}
              onChange={handleNumberChange}
              min="0"
              className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </Field>
        </Fieldset>

        <Fieldset className="mt-6 border-t border-slate-300 pt-6">
          {" "}
          {/* Darker border */}
          <Field className="flex items-center gap-3">
            <Label className="text-sm font-medium text-slate-700">
              Adicionar quantidade Delegada e Conserto?
            </Label>
            <Checkbox
              checked={advancedOptions}
              onChange={setAdvancedOptions}
              className={`
                relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
                transition-colors duration-200 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2
                ${
                  advancedOptions
                    ? "bg-slate-900" // "On" state
                    : "bg-slate-400" // "Off" state (darker for contrast)
                }
              `}
            >
              <Check
                className={`
                  pointer-events-none inline-block h-6 w-6 transform rounded-full bg-slate-300 shadow ring-0
                  transition duration-200 ease-in-out
                  ${
                    advancedOptions
                      ? "translate-x-5" // New "on" position
                      : "translate-x-0"
                  }
                `}
              />
            </Checkbox>
          </Field>
          {advancedOptions && (
            <div className="mt-4 space-y-4 pl-0">
              <Field className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-slate-700">
                  Delegada:
                </Label>
                <Input
                  type="number"
                  name="using_quantity"
                  placeholder="12345"
                  value={material.using_quantity}
                  onChange={handleNumberChange}
                  min="0"
                  className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </Field>

              <Field className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-slate-700">
                  Reparo:
                </Label>
                <Input
                  type="number"
                  name="repair_quantity"
                  placeholder="12345"
                  value={material.repair_quantity}
                  onChange={handleNumberChange}
                  min="0"
                  className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </Field>
            </div>
          )}
        </Fieldset>
      </div>
    </>
  );
};

export default MaterialFormsSection;
