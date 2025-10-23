import { useEffect, useState } from "react";
import type { CreateEventoDto } from "../../dto/CreateEventoDTO";
import type { CreateMaterialDTO } from "../../dto/CreateMaterialDTO";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import EventoForms from "./EventoForms";
import MaterialSection from "./MaterialSection";

const getEventosFromStorage = (): CreateEventoDto[] => {
  try {
    const storedEvento = localStorage.getItem("evento");
    return storedEvento ? JSON.parse(storedEvento) : [];
  } catch (error) {
    console.error("Failed to parse evento from localStorage", error);
    return [];
  }
};

function CadastroEventoPage() {
  // Variaveis
  const navigate = useNavigate();
  const { id } = useParams();

  const [evento, setEvento] = useState<CreateEventoDto>({
    id: -1,
    nome: "",
    local: "",
    dataInicio: "",
    dataFim: "",
    valorBruto: 0,
    sinal: 0,
    materiais: [],
  });

  const pageTitle = evento.id > 0 ? "Editar Evento" : "Cadastro de Evento";

  // Funções
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
    if (
      evento.nome.trim() === "" ||
      evento.local.trim() === "" ||
      evento.dataInicio.trim() === "" ||
      evento.valorBruto <= 0
    ) {
      return alert("Preencha todos campos obrigatórios");
    }

    const savedEvento = getEventosFromStorage();

    if (!id) {
      const eventoFinal = {
        ...evento,
        id: savedEvento.length + 1,
        status: "em-andamento",
      };

      let savedEventos: CreateEventoDto[] = [];
      if (Array.isArray(savedEvento)) {
        savedEventos = savedEvento;
      }

      const novaListaDeEventos = [...savedEventos, eventoFinal];
      localStorage.setItem("evento", JSON.stringify(novaListaDeEventos));
    } else {
      const modifyEvento = savedEvento.map((ev) => {
        if (ev.id === evento.id) {
          return { ...evento, status: ev.status };
        }
        return ev;
      });
      localStorage.setItem("evento", JSON.stringify(modifyEvento));
    }
    console.log("Evento:", evento);
    navigate("/evento/em-andamento");
  };

  // Validação temporário até desenvolver o backend
  const onClickAddMaterial = (
    materialNovo: CreateMaterialDTO,
    quant: number
  ) => {
    if (evento.materiais.find((m) => m.id === materialNovo.id)) {
      alert("Material adicionado anteriormente");
      return;
    }

    const materialAdicionar = { ...materialNovo, quantidade: quant };
    setEvento((prevState) => ({
      ...prevState,
      materiais: [...prevState.materiais, materialAdicionar],
    }));
  };

  // Outros
  useEffect(() => {
    const savedEvento = getEventosFromStorage();
    if (id) {
      const newEvento = savedEvento.find((ev) => ev.id === Number(id));
      if (!newEvento) return;

      setEvento(newEvento);
    }
  }, [id]);

  return (
    <>
      <div className="p-4 bg-slate-400 min-h-screen space-y-17">
        {/* Evento */}
        <EventoForms
          evento={evento}
          handleNumberChange={handleNumberChange}
          handleTextChange={handleTextChange}
          title={pageTitle}
        />

        {/* Materiais */}
        <MaterialSection
          material={evento.materiais}
          onClickAddMaterial={onClickAddMaterial}
        />

        <div className="bg-white border-1 p-3 rounded-md flex justify-between">
          <Button
            className="bg-slate-100 rounded-md border-2 p-2 text-2xl"
            onClick={() => navigate(-1)}
          >
            Retornar sem Salvar
          </Button>
          <Button
            className="bg-slate-100 rounded-md border-2 p-2 text-2xl"
            onClick={() => handleClickAddEvento()}
          >
            {evento.id > 0 ? "Salvar Alterações" : "Adicionar Evento"}
          </Button>
        </div>
      </div>
    </>
  );
}

export default CadastroEventoPage;
