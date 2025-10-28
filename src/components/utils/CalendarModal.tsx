import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import Button from "./Button";
import type { Event } from "../../pages/CalendarPage";
import { Fragment } from "react";
import { MapPin, Clock } from "lucide-react";

interface CalendarModalProps {
  closeModal: () => void;
  isModalOpen: boolean;
  content: Event | Event[] | null;
}

const CalendarModal: React.FC<CalendarModalProps> = ({
  closeModal,
  isModalOpen,
  content,
}) => {
  // Opções de formatação para data e hora
  const dateTimeFormat: Intl.DateTimeFormatOptions = {
    dateStyle: "short",
    timeStyle: "short",
  };

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog open={isModalOpen} onClose={closeModal} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/60 transition-opacity duration-300 ease-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md space-y-4 rounded-lg border border-green-800 bg-emerald-950 p-6
                       shadow-xl transition-all duration-300 ease-out 
                       data-[closed]:-translate-y-10 data-[closed]:opacity-0"
          >
            <DialogTitle as="h3" className="text-xl font-bold text-gray-100">
              Evento(s)
            </DialogTitle>

            <div className="max-h-60 overflow-y-auto text-gray-300">
              {content === null ? (
                <p>Nenhum evento selecionado.</p>
              ) : Array.isArray(content) ? (
                // ---  (Lista de eventos) ---
                <ul className="list-inside list-disc space-y-4">
                  {content.map((ev) => (
                    <li key={ev.title}>
                      <span className="font-medium text-gray-100">
                        {ev.title}
                      </span>
                      <p className="mt-1 flex items-center gap-2 text-sm text-gray-300">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        {ev.local}
                      </p>
                      <p className="flex items-center gap-2 text-sm text-gray-400">
                        <Clock className="h-4 w-4 flex-shrink-0" />
                        {ev.start.toLocaleString("pt-BR", dateTimeFormat)}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                // --- (Evento único) ---
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-100">{content.title}</h4>
                  <p className="flex items-center gap-2 text-sm text-gray-300">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    {content.local}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    {content.start.toLocaleString("pt-BR", dateTimeFormat)}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <Button
                className="rounded-md bg-emerald-900 px-4 py-2 text-base font-medium text-green-100
                           shadow-sm
                           hover:bg-green-700
                           focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                onClick={closeModal}
              >
                Fechar
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CalendarModal;
