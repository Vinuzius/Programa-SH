import { Fieldset, Field, Label, Input } from "@headlessui/react";
import type { CreateEventoDto } from "../../dto/CreateEventoDTO";

interface EventoFormsProps {
  evento: CreateEventoDto;
  handleTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EventoForms: React.FC<EventoFormsProps> = ({
  evento,
  handleTextChange,
  handleNumberChange,
}) => {
  return (
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
  );
};

export default EventoForms;
