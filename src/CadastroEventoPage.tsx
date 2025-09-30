import { useEffect, useState } from "react";
import type { CreateEventoDto } from "./dto/CreateEventoDTO";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Field,
  Fieldset,
  Input,
  Label,
} from "@headlessui/react";
import type { CreateMaterialDTO } from "./dto/CreateMaterialDTO";
import Button from "./components/Button";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CadastroEventoPage() {
  const [evento, setEvento] = useState<CreateEventoDto>(() => {
    try {
      const storedEvento = localStorage.getItem("evento");
      return storedEvento ? JSON.parse(storedEvento) : [];
    } catch (error) {
      console.error("Failed to parse evento from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("evento", JSON.stringify(evento));
    //nome do que eu quero armazenar, e o que vai ser armazenado
  }, [evento]);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    {
      /* fazer validação de texto depois */
    }
    const { name, value } = event.target;
    setEvento((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const valor = parseFloat(value);

    if (!isNaN(valor)) {
      setEvento((prevState) => ({
        ...prevState,
        [name]: valor,
      }));
    }
  };

  const MateriaisExemplo: CreateMaterialDTO[] = [
    { id: 1, nome: "Caixa de Som X", quantidade: 10 },
    { id: 2, nome: "Pé com borracha Y", quantidade: 4 },
    { id: 3, nome: "Material Z sem borracha", quantidade: 5 },
  ];

  const [query, setQuery] = useState("");
  const [materialSelecioando, setMaterialSelecioando] =
    useState<CreateMaterialDTO>({
      id: 0,
      nome: "",
      quantidade: 0,
    });
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(1);
  const [material, setMaterial] = useState<CreateMaterialDTO[]>([]);

  const filteredMaterial =
    query === ""
      ? MateriaisExemplo
      : MateriaisExemplo.filter((material) => {
          return material.nome.toLowerCase().includes(query.toLowerCase());
        });

  const navigate = useNavigate();
  // Validação temporário até desenvolver o backend
  const onClickAddMaterial = (
    materialNovo: CreateMaterialDTO,
    quant: number
  ) => {
    if (material.find((m) => m.id === materialNovo.id)) {
      alert("Material adicionado anteriormente");
      return;
    }

    materialNovo.quantidade = quant;
    setMaterial((prevState) => [...prevState, materialNovo]);
  };

  // Validação temporário até desenvolver o backend
  const handleClickAddEvento = () => {
    evento.materiais = material;
    console.log("Evento cadastrado:", evento);
    navigate("/");
  };

  return (
    <>
      <div className="p-4 bg-slate-400 min-h-screen space-y-17">
        {/* Evento */}
        <Fieldset className={"space-y-2"} key={"evento"}>
          <h1 className="text-center text-3xl font-bold">Cadastro de Evento</h1>

          <Field className={""}>
            <Label>Nome do Evento: </Label>
            <Input
              type="text"
              name="nome"
              placeholder="Evento XXX"
              value={evento.nome}
              onChange={handleTextChange}
              className={"border rounded-md bg-slate-100"}
            />
          </Field>

          <Field className={""}>
            <Label>Local do Evento: </Label>
            <Input
              type="text"
              name="local"
              placeholder="Local YYY"
              value={evento.local}
              onChange={handleTextChange}
              className={"border rounded-md bg-slate-100"}
            />
          </Field>

          <Field className={""}>
            <Label>Data e Horário do Evento: </Label>
            <Input
              type="datetime-local"
              name="dataInicio"
              placeholder=" 01/01/2025 01:00"
              value={evento.dataInicio}
              onChange={handleTextChange}
              className={"border rounded-md bg-slate-100"}
            />
          </Field>

          <Field className={""}>
            <Label>Data e Horário de Fim: </Label>
            <Input
              type="datetime-local"
              name="dataFim"
              placeholder="02/01/2025 00:00"
              value={evento.dataFim}
              onChange={handleTextChange}
              className={"border rounded-md bg-slate-100"}
            />
          </Field>

          <Field className={""}>
            <Label>Valor Bruto: </Label>
            <Input
              type="number"
              name="valorBruto"
              placeholder="1000.00"
              value={evento.valorBruto}
              onChange={handleNumberChange}
              step={100}
              className={"border rounded-md bg-slate-100"}
            />

            <Label>Sinal: </Label>
            <Input
              type="number"
              name="sinal"
              placeholder="00.00"
              value={evento.sinal}
              onChange={handleNumberChange}
              step={100}
              className={"border rounded-md bg-slate-100"}
            />
          </Field>
        </Fieldset>

        {/* Materiais */}
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
              onChange={(e) =>
                setQuantidadeSelecionada(parseInt(e.target.value))
              }
            />
          </Field>

          {material.map((m) => {
            return (
              <p>
                {m.nome} - {m.quantidade}{" "}
              </p>
            );
          })}
          <Button
            onClick={() =>
              onClickAddMaterial(materialSelecioando, quantidadeSelecionada)
            }
            className="bg-white text-center font-bold text-2xl "
          >
            +
          </Button>
        </Fieldset>

        <div className="bg-white border-1 p-3 rounded-md">
          <div className="flex justify-end">
            <Button
              className="bg-slate-100 rounded-md border-2 p-2 text-2xl"
              onClick={() => handleClickAddEvento()}
            >
              Cadastrar Evento
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CadastroEventoPage;
