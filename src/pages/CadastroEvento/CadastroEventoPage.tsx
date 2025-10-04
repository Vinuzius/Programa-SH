import { useState } from "react";
import type { CreateEventoDto } from "../../dto/CreateEventoDTO";
import type { CreateMaterialDTO } from "../../dto/CreateMaterialDTO";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import EventoForms from "./EventoForms";
import MaterialSection from "./MaterialSection";

function CadastroEventoPage() {
  const navigate = useNavigate();

  const [evento, setEvento] = useState<CreateEventoDto>({
    nome: "",
    local: "",
    dataInicio: "",
    dataFim: "",
    valorBruto: 0,
    sinal: 0,
    materiais: [],
  });

  const [material, setMaterial] = useState<CreateMaterialDTO[]>([]);

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

  // Validação temporário até desenvolver o backend
  const handleClickAddEvento = () => {
    const eventoFinal = {
      ...evento,
      materiais: material,
      status: "em-andamento",
    };

    let eventosSalvos = [];
    try {
      const dadosSalvos = localStorage.getItem("evento");
      if (dadosSalvos) {
        const dadosParseados = JSON.parse(dadosSalvos);
        // Make sure the data is actually an array before using it
        if (Array.isArray(dadosParseados)) {
          eventosSalvos = dadosParseados;
        }
      }
    } catch (error) {
      console.error("Error parsing events from storage:", error);
      // If anything fails, we'll just start with a fresh empty array
    }

    const novaListaDeEventos = [...eventosSalvos, eventoFinal];
    localStorage.setItem("evento", JSON.stringify(novaListaDeEventos));

    console.log("Evento cadastrado:", evento);
    navigate("/evento/em-andamento");
  };

  // Validação temporário até desenvolver o backend
  const onClickAddMaterial = (
    materialNovo: CreateMaterialDTO,
    quant: number
  ) => {
    if (material.find((m) => m.id === materialNovo.id)) {
      alert("Material adicionado anteriormente");
      return;
    }

    const materialAdicionar = { ...materialNovo, quantidade: quant };
    setMaterial((prevState) => [...prevState, materialAdicionar]);
  };

  return (
    <>
      <div className="p-4 bg-slate-400 min-h-screen space-y-17">
        {/* Evento */}
        <EventoForms
          evento={evento}
          handleNumberChange={handleNumberChange}
          handleTextChange={handleTextChange}
        />

        {/* Materiais */}
        <MaterialSection
          material={material}
          onClickAddMaterial={onClickAddMaterial}
        />

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
