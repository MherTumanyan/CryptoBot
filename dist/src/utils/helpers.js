"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberToFixed = exports.isValidTransferAmount = exports.encodeText = exports.divideNumberByPieces = exports.getCustomId = void 0;
var nanoid_1 = require("nanoid");
var lodash_1 = require("lodash");
exports.getCustomId = function (_a) {
    var _b = _a.alphabet, alphabet = _b === void 0 ? '1234567890' : _b, _c = _a.fixAlphabet, fixAlphabet = _c === void 0 ? '' : _c, _d = _a.length, length = _d === void 0 ? 6 : _d;
    var nanoId = nanoid_1.customAlphabet(alphabet, length);
    return fixAlphabet + nanoId();
};
exports.divideNumberByPieces = function (x, delimiter) { return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter || ' '); };
exports.encodeText = function (text) {
    var textLength = text.length;
    var encodePercent = 0.5;
    var oneLetterText = textLength === 1;
    var lastLetter = textLength - 1;
    var lettersWithoutFirstAndLast = textLength - 2;
    var textArr = lodash_1.map(text, function (letter, index) {
        if (!oneLetterText && (index < lettersWithoutFirstAndLast * encodePercent || index === lastLetter))
            return letter;
        return 'x';
    });
    return textArr.join('');
};
exports.isValidTransferAmount = function (_a) {
    var minTransactionValue = _a.minTransactionValue, maxTransactionValue = _a.maxTransactionValue, amountInCoin = _a.amountInCoin, totalAmountInCoin = _a.totalAmountInCoin, userCoinBalance = _a.userCoinBalance;
    if (isNaN(amountInCoin) || userCoinBalance < totalAmountInCoin || amountInCoin <= 0)
        return { error: '', code: 400, success: false, isNanOrInvalidBalance: true };
    if (amountInCoin > maxTransactionValue)
        return { error: '', code: 400, success: false, maxError: true };
    if (amountInCoin < minTransactionValue)
        return { error: '', code: 400, success: false, minError: true, };
    return { error: '', code: 200, success: true };
};
exports.numberToFixed = function (value, sign) {
    if (sign === void 0) { sign = 6; }
    return parseFloat(value.toFixed(sign));
};
//# sourceMappingURL=helpers.js.map