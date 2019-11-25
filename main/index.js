"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var supreme_1 = require("./supreme");
var utility_1 = require("./utility");
var testProduct = {
    category: "Sweatshirts",
    keywords: "Disturbed Zip Up Hooded Sweatshirt",
    style: "Light Violet",
    size: "Medium",
    styleAlternative: "Red",
    sizeAlternative: "Medium"
};
var testProfile = {
    profileName: "",
    fullName: "",
    email: "",
    tel: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    type: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    CVV: "",
    terms: true
};
var testSettings = {
    testMode: true,
    dropTime: "12:00:00",
    delay: 3000,
    priceLimit: 0
};
function cop(supreme, runtimeTimer, product, profile, settings) {
    return __awaiter(this, void 0, void 0, function () {
        var productToCop, productState, err_1, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    return [4 /*yield*/, supreme.searchProductByKeywords(product)];
                case 1:
                    productToCop = _a.sent();
                    console.log(productToCop);
                    return [4 /*yield*/, supreme.getProductState(productToCop["id"], product)];
                case 2:
                    productState = _a.sent();
                    console.log(productState);
                    if (!productState.found ||
                        !productState.stock_level ||
                        productState.stock_level == null) {
                        throw new Error(productState["message"]);
                    }
                    runtimeTimer.start();
                    return [4 /*yield*/, supreme.addProductToCart(productState)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, supreme.checkout(profile, settings, runtimeTimer)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 7];
                case 7: return [3 /*break*/, 9];
                case 8:
                    err_2 = _a.sent();
                    setTimeout(function () {
                        console.log(err_2);
                        cop(supreme, runtimeTimer, product, profile, settings);
                    }, 200);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
// (async () => {
//   const supreme = new Supreme();
//   let runtimeTimer = new Utility.RuntimeTimer();
//   await supreme.init();
//   await cop(supreme, runtimeTimer);
// })();
var Bot;
(function (Bot) {
    function start(product, profile, settings) {
        return __awaiter(this, void 0, void 0, function () {
            var supreme, runtimeTimer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(product, profile, settings);
                        supreme = new supreme_1.Supreme();
                        runtimeTimer = new utility_1.Utility.RuntimeTimer();
                        return [4 /*yield*/, supreme.init()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, cop(supreme, runtimeTimer, product, profile, settings)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    Bot.start = start;
})(Bot = exports.Bot || (exports.Bot = {}));
//# sourceMappingURL=index.js.map