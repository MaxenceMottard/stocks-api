import { IsNotEmpty } from 'class-validator';

export class SymbolParams {
  @IsNotEmpty()
  symbol: string;
}
