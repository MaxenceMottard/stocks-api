import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SearchParams } from './dto/SearchParams';
import { SymbolParams } from './dto/SymbolParams';
import { IntradayParams } from './dto/IntradayParams';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/search')
  search(@Body() params: SearchParams) {
    return this.appService.search(params);
  }

  @Get('/quote')
  quote(@Body() params: SymbolParams) {
    return this.appService.quote(params);
  }

  @Get('/intraday')
  intraday(@Body() params: IntradayParams) {
    return this.appService.intraday(params);
  }

  @Get('/monthly')
  monthly(@Body() params: IntradayParams) {
    return this.appService.monthly(params);
  }
}
