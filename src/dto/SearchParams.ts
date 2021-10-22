import { IsNotEmpty } from 'class-validator';

export class SearchParams {
  @IsNotEmpty()
  keywords: string;
}
