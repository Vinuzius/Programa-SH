import type { CreateMaterialDTO } from "./CreateMaterialDTO";

export interface CreateEventoDto {
  nome: string;
  local: string;
  dataInicio: string; // Usar string no formato ISO (YYYY-MM-DDTHH:mm)
  dataFim?: string;
  valorBruto: number;
  sinal?: number;
  materiais: CreateMaterialDTO[];
}
