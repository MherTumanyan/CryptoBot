process.env.JWT_SECRET='gRXcd>ht*q+X*JQ3#VX/Zl{8p9Y88X';
process.env.JWT_SECRET_ADMIN='iCpJV6ghfyiJmwSRTujYypIvVBa8orRK';
process.env.JWT_SECRET_MAIL='sWOxjB>,58<xeXA5q!p|';

BOT_URL='http://127.0.0.1:3030';

process.env.BLOCKCHAIN_INFO_URL='https://www.blockchain.com/btc/address';

process.env.USD_TO_AMD='https://cb.am/latest.json.php?currency=USD';
process.env.BTC_TO_USD='https://api.coinbase.com/v2/prices/spot?currency=USD';
process.env.USD_TO_RUB='https://www.cbr.ru/scripts/XML_daily.asp';
process.env.COINBASE_API_KEY='hBKlp1AsDczbsKgj';
process.env.COINBASE_API_SECRET='6qGLIKnradlKTnatC0fKTX5ZYV4fiXMs';
process.env.COINBASE_ACCOUNT='e9acd5c5-8863-5e7e-bb69-e08d9caf074a';


process.env.TWILIO_PHONE_NUMBER='+1 202 953 4770';
process.env.TWILIO_TOKEN='4a47bced177d584067184f8d0e40543b';
process.env.TWILIO_SID='AC3293b9d15b64651e98b2cf3592d04036';
process.env.APP_NAME='TelO BTC';

process.env.BLOT_API_SECRET='d488b7930060121cbd7e7f8e82bb98ce';

process.env.CLAN_JWT_KEY='gRXcd>ht*q+X*JQ3#VX/Zl{8p9Y88X';
process.env.CLAN_API_URL='http://0.0.0.0:3100/graphql';

module.exports = {
  roots: ['<rootDir>/test/'],
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  moduleNameMapper: {
    '^@spot_wallet/utils':  '<rootDir>/src/utils',
    '^@spot_wallet/types':  '<rootDir>/src/modules/core/types',
    '^@spot_wallet(.*)':  '<rootDir>/src/modules$1',
  },
};
