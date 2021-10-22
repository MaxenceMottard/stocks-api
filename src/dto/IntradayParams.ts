import { IsNotEmpty } from 'class-validator';
import { SymbolParams } from './SymbolParams';

export class IntradayParams extends SymbolParams {
  @IsNotEmpty()
  slice: string;

  @IsNotEmpty()
  interval: string;
}
