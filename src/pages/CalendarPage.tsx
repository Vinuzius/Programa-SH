import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import type { CreateEventoDto } from "../dto/CreateEventoDTO";
import { format, getDay, parse, startOfWeek } from "date-fns";
import { ptBR } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarModal from "../components/utils/CalendarModal";
import { useMemo, useState, useEffect, useCallback } from "react";

const getEventosFromStorage = (): CreateEventoDto[] => {
  try {
    const storedEvento = localStorage.getItem("evento");
    return storedEvento ? JSON.parse(storedEvento) : [];
  } catch (error) {
    console.error("Failed to parse evento from localStorage", error);
    return [];
  }
};

const locales = {
  "pt-br": ptBR,
};

export interface Event {
  title: string;
  start: Date;
  end?: Date;
  local: string;
}

const messagesPtBR = {
  month: "Mês",
  week: "Semana",
  day: "Dia",
  today: "Hoje",
  previous: "Voltar",
  next: "Próximo",
};

const CalendarPage = () => {
  const storageEvents = useMemo(() => getEventosFromStorage(), []);

  const localizerCalendar = useMemo(() => {
    return dateFnsLocalizer({
      format,
      parse,
      startOfWeek,
      getDay,
      locales,
    });
  }, []);

  const [events, setEvents] = useState<Event[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<Event | Event[] | null>(
    null
  );

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  const openModal = useCallback(
    (content: Event | Event[]) => {
      setModalContent(content);
      setIsModalOpen(true);
    },
    [setIsModalOpen, setModalContent]
  );

  useEffect(() => {
    const mapEvents: Event[] = storageEvents.map((ev) => ({
      title: ev.nome,
      start: new Date(ev.dataInicio),
      end: ev.dataFim ? new Date(ev.dataFim) : new Date(ev.dataInicio),
      local: ev.local,
    }));
    setEvents(mapEvents);
  }, [storageEvents]);

  //console.log("Formatted Events:", events);

  return (
    <>
      <div className="h-[100vh]">
        <Calendar
          localizer={localizerCalendar}
          events={events}
          messages={messagesPtBR}
          culture="pt-br"
          onSelectEvent={openModal}
          onShowMore={(events) => openModal(events)}
          className="h-full"
        />
      </div>

      <CalendarModal
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        content={modalContent}
      />
    </>
  );
};

export default CalendarPage;
