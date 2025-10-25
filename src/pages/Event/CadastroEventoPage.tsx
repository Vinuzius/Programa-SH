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

  // ... (All your functions like handleTextChange, handleClickAddEvento, etc. are unchanged)
  // Funções
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // ... (your logic is unchanged)
    const { name, value } = event.target;
    setEvento((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // ... (your logic is unchanged)
    const { name, value } = event.target;
    const valor = parseFloat(value);
    if (!isNaN(valor)) {
      setEvento((prevState) => ({
        ...prevState,
        [name]: valor,
      }));
    }
  };

  const handleClickAddEvento = () => {
    // ... (your logic is unchanged)
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

  const onClickAddMaterial = (
    materialNovo: CreateMaterialDTO,
    quant: number
  ) => {
    // ... (your logic is unchanged)
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
    // ... (your logic is unchanged)
    const savedEvento = getEventosFromStorage();
    if (id) {
      const newEvento = savedEvento.find((ev) => ev.id === Number(id));
      if (!newEvento) return;
      setEvento(newEvento);
    }
  }, [id]);

  return (
    <>
      {/* MAIN PAGE WRAPPER
        - Added 'pb-24' (padding-bottom) to prevent sticky footer
          from hiding content at the bottom
      */}
      <div className="min-h-screen bg-teal-800 p-4 pb-24 md:p-8">
        {/* GRID LAYOUT WRAPPER (Unchanged) */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2">
          <EventoForms
            evento={evento}
            handleNumberChange={handleNumberChange}
            handleTextChange={handleTextChange}
            title={pageTitle}
          />

          <MaterialSection
            material={evento.materiais}
            onClickAddMaterial={onClickAddMaterial}
          />
        </div>

        {/* This <div ...> for the button bar has been DELETED */}
      </div>

      {/* === NEW STICKY FOOTER (Based on your example) === */}
      {/* - 'emerald' changed to 'green' to match our theme
        - 'sticky bottom-0' is from your example
      */}
      <footer className="sticky bottom-0 w-full border-t border-green-800 bg-emerald-950 p-4 shadow-sm">
        {/* - 'max-w-lg' changed to 'max-w-7xl' to align with this page's grid
         */}
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* --- Secondary Button (Your Style) --- */}
          <Button
            className="rounded-md bg-emerald-900 px-4 py-2 text-base font-medium text-green-100
                       shadow-sm
                       hover:bg-green-700
                       focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            onClick={() => navigate(-1)} // Correct function
          >
            Retornar sem Salvar
          </Button>

          {/* --- Primary Button (Your Style) --- */}
          <Button
            className="rounded-md bg-emerald-900 px-4 py-2 text-base font-medium text-green-100
                       shadow-sm
                       hover:bg-green-700
                       focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            onClick={() => handleClickAddEvento()} // Correct function
          >
            {/* Correct text */}
            {evento.id > 0 ? "Salvar Alterações" : "Adicionar Evento"}
          </Button>
        </div>
      </footer>
    </>
  );
}

export default CadastroEventoPage;
