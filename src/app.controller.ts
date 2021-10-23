import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { SearchParams } from './dto/SearchParams';
import { SymbolParams } from './dto/SymbolParams';
import { IntradayParams } from './dto/IntradayParams';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/search')
  search(@Query() params: SearchParams) {
    return this.appService.search(params);
  }

  @Get('/quote')
  quote(@Query() params: SymbolParams) {
    return this.appService.quote(params);
  }

  @Get('/intraday')
  intraday(@Query() params: IntradayParams) {
    return this.appService.intraday(params);
  }

  @Get('/monthly')
  monthly(@Query() params: SymbolParams) {
    return this.appService.monthly(params);
  }
}
