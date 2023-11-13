import { TipoGastoInterface } from "./tipo-gasto.interface";

export class GastoInterface{
  id: number;
  description: string;
  price: number;
  fecha:string;
  tipoGasto: TipoGastoInterface
}
