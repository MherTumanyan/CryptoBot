import { customAlphabet } from 'nanoid';
import { map } from 'lodash';

import { CustomID, OrderOperationStatus } from './types';

export const getCustomId = ({ alphabet = '1234567890', fixAlphabet = '', length = 6 }: CustomID): string => {
  const nanoId = customAlphabet(alphabet, length);
  return fixAlphabet + nanoId();
};

export const divideNumberByPieces = (x: number, delimiter?: string): string => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter || ' ');

export const encodeText = (text: string): string => {
  const textLength = text.length;
  const encodePercent = 0.5;
  const oneLetterText = textLength === 1;
  const lastLetter = textLength - 1;
  const lettersWithoutFirstAndLast = textLength - 2;

  const textArr = map(text, (letter, index) => {
    if (!oneLetterText && (index < lettersWithoutFirstAndLast * encodePercent || index === lastLetter)) return letter;

    return 'x';
  });

  return textArr.join('');
};

export const isValidTransferAmount = ({ minTransactionValue, maxTransactionValue, amountInCoin, totalAmountInCoin, userCoinBalance }): OrderOperationStatus => {
  if (isNaN(amountInCoin) || userCoinBalance < totalAmountInCoin || amountInCoin <= 0 )
    return { error: '', code: 400, success: false, isNanOrInvalidBalance: true };
  if (amountInCoin > maxTransactionValue)
    return { error: '', code: 400, success: false, maxError: true };
  if (amountInCoin < minTransactionValue)
    return { error: '', code: 400, success: false, minError: true, };

  return { error: '', code: 200, success: true };
};

export const numberToFixed = (value: number, sign: number = 6): number => parseFloat(value.toFixed(sign));
