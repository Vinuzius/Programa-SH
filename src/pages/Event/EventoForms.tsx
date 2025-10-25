import { Fieldset, Field, Label, Input } from "@headlessui/react";
import type { CreateEventoDto } from "../../dto/CreateEventoDTO";

interface EventoFormsProps {
  evento: CreateEventoDto;
  handleTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  title?: string;
}

const EventoForms: React.FC<EventoFormsProps> = ({
  evento,
  handleTextChange,
  handleNumberChange,
  title,
}) => {
  // --- INPUT CLASSES DOCUMENTATION ---
  // The input is light gray, so the focus ring can be a bright green
  const inputClasses = [
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
    // Fieldset is now the dark green card
    <Fieldset
      className={
        "max-w-xl space-y-6 rounded-lg bg-green-950 p-8 shadow-lg w-full"
      }
      key={"evento"}
    >
      {/* Title is now white for readability */}
      <h1 className="text-center text-3xl font-bold text-white">
        {" "}
        {/* <-- CHANGED: Title color */}
        {title}
      </h1>

      {/* Field: Nome do Evento */}
      <Field className={"flex flex-col"}>
        {/* Labels are now a light green */}
        <Label className="mb-1 text-sm font-medium text-white">
          {" "}
          {/* <-- CHANGED: Label color */}
          Nome do Evento:
        </Label>
        <Input
          type="text"
          name="nome"
          placeholder="Evento XXX"
          value={evento.nome}
          onChange={handleTextChange}
          className={inputClasses} // Inputs are still light gray
        />
      </Field>

      {/* Field: Local do Evento */}
      <Field className={"flex flex-col"}>
        <Label className="mb-1 text-sm font-medium text-white">
          {" "}
          {/* <-- CHANGED: Label color */}
          Local do Evento:
        </Label>
        <Input
          type="text"
          name="local"
          placeholder="Local YYY"
          value={evento.local}
          onChange={handleTextChange}
          className={inputClasses}
        />
      </Field>

      {/* Field: Data e Horário de Início */}
      <Field className={"flex flex-col"}>
        <Label className="mb-1 text-sm font-medium text-white">
          {" "}
          {/* <-- CHANGED: Label color */}
          Data e Horário de Início:
        </Label>
        <Input
          type="datetime-local"
          name="dataInicio"
          placeholder=" 01/01/2025 01:00"
          value={evento.dataInicio}
          onChange={handleTextChange}
          className={inputClasses}
        />
      </Field>

      {/* Field: Data e Horário de Fim */}
      <Field className={"flex flex-col"}>
        <Label className="mb-1 text-sm font-medium text-white">
          {" "}
          {/* <-- CHANGED: Label color */}
          Data e Horário de Fim:
        </Label>
        <Input
          type="datetime-local"
          name="dataFim"
          placeholder="02/01/2025 00:00"
          value={evento.dataFim}
          onChange={handleTextChange}
          className={inputClasses}
        />
      </Field>

      {/* Grid for Value Fields */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Field: Valor Bruto */}
        <Field className={"flex flex-col"}>
          <Label className="mb-1 text-sm font-medium text-white">
            {" "}
            {/* <-- CHANGED: Label color */}
            Valor Bruto:
          </Label>
          <Input
            type="number"
            name="valorBruto"
            placeholder="1000.00"
            value={evento.valorBruto}
            onChange={handleNumberChange}
            step={100}
            className={inputClasses}
          />
        </Field>
        {/* Field: Sinal */}
        <Field className={"flex flex-col"}>
          <Label className="mb-1 text-sm font-medium text-white">
            {" "}
            {/* <-- CHANGED: Label color */}
            Sinal:
          </Label>
          <Input
            type="number"
            name="sinal"
            placeholder="00.00"
            value={evento.sinal}
            onChange={handleNumberChange}
            step={100}
            className={inputClasses}
          />
        </Field>
      </div>
    </Fieldset>
  );
};

export default EventoForms;
