"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currencies = exports.reportsDateFormat = exports.TWO_HOURLY_SCHEDULE = exports.HOURLY_SCHEDULE = exports.TWO_HOURS = exports.ONE_HOUR = exports.HALF_HOUR = exports.ONE_DAY = exports.TELEGRAM_ID_KEYS = exports.ROLE_VALUES = void 0;
exports.ROLE_VALUES = {
    USER: 1,
    ADMIN: 4
};
exports.TELEGRAM_ID_KEYS = ['telegramId', 'telegramIds', 'buyerTelegramId', 'sellerTelegramId', 'sellersInfos'];
exports.ONE_DAY = 24 * 60 * 60 * 1000;
exports.HALF_HOUR = 30 * 60 * 1000;
exports.ONE_HOUR = 60 * 60 * 1000;
exports.TWO_HOURS = 2 * 60 * 60 * 1000;
exports.HOURLY_SCHEDULE = '1 * * * ';
exports.TWO_HOURLY_SCHEDULE = '2 * * * ';
exports.reportsDateFormat = 'DD/MM/YYYY';
exports.currencies = ['USD', 'RUB', 'AMD', 'BTC', 'DASH', 'ETH', 'USDT'];
//# sourceMappingURL=constants.js.map