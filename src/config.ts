// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export default () => ({
  ALPHAVANTAGE_API_KEY: process.env.ALPHAVANTAGE_API_KEY,
});
