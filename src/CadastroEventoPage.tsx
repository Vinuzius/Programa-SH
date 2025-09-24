import { useState } from "react";
import type { CreateEventoDto } from "./dto/CreateEventoDTO";
import { Field, Fieldset, Input, Label } from "@headlessui/react";

function CadastroEventoPage() {
  const [evento, setEvento] = useState<CreateEventoDto>({
    nome: "",
    local: "",
    dataInicio: "",
    valorBruto: 0,
    materiais: [],
    dataFim: "",
    sinal: 0,
  });

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <>
      <div className="p-4 bg-slate-400 min-h-screen space-y-4">
        <h1 className="text-center text-3xl font-bold"> Cadastro de Evento </h1>
        <Fieldset className={"space-y-2"}>
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
              className={"border rounded-md bg-slate-100"}
            />

            <Label>Sinal: </Label>
            <Input
              type="number"
              name="sinal"
              placeholder="00.00"
              value={evento.sinal}
              onChange={handleNumberChange}
              className={"border rounded-md bg-slate-100"}
            />
          </Field>
        </Fieldset>
      </div>
    </>
  );
}

export default CadastroEventoPage;
