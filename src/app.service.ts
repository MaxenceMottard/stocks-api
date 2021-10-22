/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable } from '@nestjs/common';
import * as axios from 'axios';
import { SearchParams } from './dto/SearchParams';
import { SymbolParams } from './dto/SymbolParams';
import { IntradayParams } from './dto/IntradayParams';
import config from './config';

@Injectable()
export class AppService {
  private readonly _key: string;
  private readonly _baseUrl: string;

  constructor() {
    this._key = config().ALPHAVANTAGE_API_KEY;
    this._baseUrl = 'https://www.alphavantage.co/query';
  }

  private generateUrl = (params: Record<string, any>): string => {
    params['apikey'] = this._key;

    const stringParams = (Object.keys(params) as string[])
      .map((key) => `${key}=${params[key]}`)
      .join('&');

    return encodeURI(`${this._baseUrl}?${stringParams}`);
  };

  search = async (params: SearchParams): Promise<any> => {
    const url = this.generateUrl({
      function: 'SYMBOL_SEARCH',
      keywords: params.keywords,
    });

    const result = await axios.default.get(url);
    const data = result.data['bestMatches'] ?? [];

    return data.map((data) => ({
      symbol: data['1. symbol'],
      name: data['2. name'],
      type: data['3. type'],
      region: data['4. region'],
      marketOpen: data['5. marketOpen'],
      marketClose: data['6. marketClose'],
      timezone: data['7. timezone'],
      currency: data['8. currency'],
      matchScore: data['9. matchScore'],
    }));
  };

  quote = async (params: SymbolParams): Promise<any> => {
    const url = this.generateUrl({
      function: 'GLOBAL_QUOTE',
      symbol: params.symbol,
    });

    return axios.default.get(url).then((result) => result.data['Global Quote']);
  };

  intraday = async (params: IntradayParams): Promise<Quote> => {
    const url = this.generateUrl({
      function: 'TIME_SERIES_INTRADAY_EXTENDED',
      symbol: params.symbol,
      slice: params.slice,
      interval: params.interval,
    });

    const result = await axios.default.get(url);

    return (
      result.data
        // @ts-ignore
        .split('\r\n')
        .slice(1)
        .map((entry) => entry.split(','))
        .map(([time, open, high, low, close, volume]) => ({
          time,
          open: Number(open),
          high: Number(high),
          low: Number(low),
          close: Number(close),
          volume: Number(volume),
        }))
    );
  };

  monthly = async (params: SymbolParams) => {
    const url = this.generateUrl({
      function: 'TIME_SERIES_DAILY',
      symbol: params.symbol,
      outputsize: 'full',
    });

    const result = await axios.default.get(url);
    const data = result.data['Time Series (Daily)'] ?? [];

    return Object.keys(data).reduce(
      (aggregator, key) => [
        ...aggregator,
        {
          time: key,
          open: Number(data[key]['1. open']),
          high: Number(data[key]['2. high']),
          low: Number(data[key]['3. low']),
          close: Number(data[key]['4. close']),
          volume: Number(data[key]['5. volume']),
        },
      ],
      [],
    );
  };
}

type Quote = {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};
