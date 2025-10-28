export type MaterialStatusEnum = "em-galpao" | "delegado" | "conserto";

export const MaterialStatusEnum = {
  Stock: "em-galpao" as MaterialStatusEnum,
  Using: "delegado" as MaterialStatusEnum,
  Repair: "conserto" as MaterialStatusEnum,
};
