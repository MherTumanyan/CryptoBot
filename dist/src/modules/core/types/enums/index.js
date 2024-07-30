"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLES = exports.EntityEnum = void 0;
var EntityEnum;
(function (EntityEnum) {
    EntityEnum["USER"] = "User";
    EntityEnum["INCOMING_TRANSACTION"] = "IncomingTransaction";
    EntityEnum["OUTGOING_TRANSACTION"] = "OutgoingTransaction";
    EntityEnum["RECEIVING_ADDRESS"] = "ReceivingAddress";
    EntityEnum["TECHNICAL"] = "Technical";
    EntityEnum["SELLER"] = "Seller";
    EntityEnum["BUYER_OFFER"] = "BuyerOffer";
    EntityEnum["SELLER_OFFER"] = "SellerOffer";
    EntityEnum["HISTORY_META"] = "HistoryMeta";
    EntityEnum["WHITELIST"] = "Whitelist";
    EntityEnum["SUGGESTED_RECEIVERS"] = "SuggestedReceivers";
})(EntityEnum = exports.EntityEnum || (exports.EntityEnum = {}));
var ROLES;
(function (ROLES) {
    ROLES["USER"] = "USER";
    ROLES["ADMIN"] = "ADMIN";
})(ROLES = exports.ROLES || (exports.ROLES = {}));
//# sourceMappingURL=index.js.map