"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentMethods = exports.msgForVerifyEmail = exports.msgForResetPassword = void 0;
// ** move this maybe to mail provieder - need to discuss how it should work
exports.msgForResetPassword = {
    text: 'resetPassword',
    subject: 'resetPassword'
};
exports.msgForVerifyEmail = {
    text: 'VerifyEmail',
    subject: 'VerifyEmail'
};
exports.paymentMethods = {
    IDRAM: 'idramPhoneNumber',
    EASYPAY: 'easyPayPhoneNumber',
    TELCELL: 'telcellPhoneNumber'
};
//# sourceMappingURL=constants.js.map