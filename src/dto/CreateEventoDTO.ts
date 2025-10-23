import type { EventoStatusEnum } from "../enum/EventoStatusEnum";
import type { CreateMaterialDTO } from "./CreateMaterialDTO";

export interface CreateEventoDto {
  id: number;
  nome: string;
  local: string;
  dataInicio: string; // Usar string no formato ISO (YYYY-MM-DDTHH:mm)
  dataFim?: string;
  valorBruto: number;
  sinal?: number;
  status?: EventoStatusEnum;
  materiais: CreateMaterialDTO[];
}
