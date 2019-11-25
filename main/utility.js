"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var Utility;
(function (Utility) {
    var RuntimeTimer = /** @class */ (function () {
        function RuntimeTimer() {
            this.NS_PER_SEC = 1e9;
            this.MS_PER_NS = 1e-6;
        }
        RuntimeTimer.prototype.start = function () {
            this.startTime = process.hrtime();
            return;
        };
        RuntimeTimer.prototype.getRuntimeMs = function () {
            var diff = process.hrtime(this.startTime);
            return (diff[0] * this.NS_PER_SEC + diff[1]) * this.MS_PER_NS;
        };
        return RuntimeTimer;
    }());
    Utility.RuntimeTimer = RuntimeTimer;
    function getRecaptchaResponseToken() {
        return new Promise(function (resolve, reject) {
            request("http://localhost:3001/fetch", function (err, res, body) {
                if (err) {
                    reject(err);
                }
                else if (res && res.statusCode == 200) {
                    var data = JSON.parse(body);
                    if (data.length) {
                        var token = data[data.length - 1]["token"];
                        resolve(token);
                    }
                    else {
                        reject("No recaptcha response token!");
                    }
                }
            });
        });
    }
    Utility.getRecaptchaResponseToken = getRecaptchaResponseToken;
})(Utility = exports.Utility || (exports.Utility = {}));
//# sourceMappingURL=utility.js.map