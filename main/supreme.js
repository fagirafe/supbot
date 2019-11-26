"use strict";
var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics = function(d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function(d, b) {
            d.__proto__ = b;
          }) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : new P(function(resolve) {
              resolve(result.value);
            }).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function() {
          return this;
        }),
      g
    );
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, "__esModule", { value: true });
var pup_browser_1 = require("./pup_browser");
var request = require("request");
var utility_1 = require("./utility");
var Supreme = /** @class */ (function(_super) {
  __extends(Supreme, _super);
  function Supreme(pieBrowser) {
    return (
      _super.call(this, pieBrowser, "https://www.supremenewyork.com") || this
    );
  }
  Supreme.prototype.getMobileStock = function() {
    return __awaiter(this, void 0, void 0, function() {
      var url;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.page.url()];
          case 1:
            url = _a.sent();
            if (!url.includes(this.baseUrl)) return [3 /*break*/, 3];
            return [
              4 /*yield*/,
              this.page.evaluate(function() {
                return new Promise(function(resolve, reject) {
                  var xmlhttp = new XMLHttpRequest();
                  var url = "https://www.supremenewyork.com/mobile_stock.json";
                  xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4) {
                      if (this.status == 200) {
                        var data = JSON.parse(this.responseText);
                        resolve(data);
                      } else {
                        reject(this.responseText);
                      }
                    }
                  };
                  xmlhttp.open("GET", url, true);
                  xmlhttp.send();
                });
              })
            ];
          case 2:
            return [2 /*return*/, _a.sent()];
          case 3:
            return [2 /*return*/, Promise.reject()];
        }
      });
    });
  };
  Supreme.prototype.searchProductByKeywords = function(productToSearch) {
    return __awaiter(this, void 0, void 0, function() {
      var stock,
        error_1,
        categories,
        categoryKey,
        _i,
        _a,
        product,
        stockProductName;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            _b.trys.push([0, 2, , 3]);
            return [4 /*yield*/, this.getMobileStock()];
          case 1:
            stock = _b.sent();
            return [3 /*break*/, 3];
          case 2:
            error_1 = _b.sent();
            return [
              2 /*return*/,
              Promise.reject("Could not get stock: " + error_1)
            ];
          case 3:
            categories = stock["products_and_categories"];
            for (categoryKey in categories) {
              if (categoryKey == productToSearch.category) {
                for (
                  _i = 0, _a = categories[categoryKey];
                  _i < _a.length;
                  _i++
                ) {
                  product = _a[_i];
                  stockProductName = product["name"];
                  if (
                    stockProductName.charAt(stockProductName.length - 1) == " "
                  ) {
                    stockProductName = stockProductName.slice(0, -1);
                  }
                  if (stockProductName.includes(productToSearch.keywords)) {
                    return [2 /*return*/, Promise.resolve(product)];
                  }
                }
              }
            }
            return [
              2 /*return*/,
              Promise.reject("Could not find product by keywords!")
            ];
        }
      });
    });
  };
  Supreme.prototype.getProduct = function(id) {
    return __awaiter(this, void 0, void 0, function() {
      var url;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.page.url()];
          case 1:
            url = _a.sent();
            if (!url.includes(this.baseUrl)) return [3 /*break*/, 3];
            return [
              4 /*yield*/,
              this.page.evaluate(function(id) {
                return new Promise(function(resolve, reject) {
                  var xmlhttp = new XMLHttpRequest();
                  var url =
                    "https://www.supremenewyork.com/shop/" + id + ".json";
                  xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4) {
                      if (this.status == 200) {
                        var data = JSON.parse(this.responseText);
                        resolve(data);
                      } else {
                        reject(this.responseText);
                      }
                    }
                  };
                  xmlhttp.open("GET", url, true);
                  xmlhttp.send();
                });
              }, id)
            ];
          case 2:
            return [2 /*return*/, _a.sent()];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  Supreme.prototype.getProductState = function(id, product) {
    return __awaiter(this, void 0, void 0, function() {
      var productDetails,
        productStyles,
        _i,
        productStyles_1,
        productStyle,
        productSizes,
        _a,
        productSizes_1,
        productSize,
        stockProductSize,
        _b,
        productSizes_2,
        productSize,
        stockProductSize;
      return __generator(this, function(_c) {
        switch (_c.label) {
          case 0:
            return [4 /*yield*/, this.getProduct(id)];
          case 1:
            productDetails = _c.sent();
            productStyles = productDetails["styles"];
            for (
              _i = 0, productStyles_1 = productStyles;
              _i < productStyles_1.length;
              _i++
            ) {
              productStyle = productStyles_1[_i];
              if (productStyle["name"].includes(product.style)) {
                productSizes = productStyle["sizes"];
                if (product.size == "None") {
                  if (productSizes[0]["name"] == "N/A") {
                    if (productSizes[0]["stock_level"] == 1) {
                      return [
                        2 /*return*/,
                        {
                          message: "In stock!",
                          found: true,
                          stock_level: true,
                          productId: id,
                          styleId: productStyle["id"],
                          sizeId: productSizes[0]["id"]
                        }
                      ];
                    } else {
                      return [
                        2 /*return*/,
                        {
                          message: "Not in stock!",
                          found: true,
                          stock_level: false,
                          productId: id,
                          styleId: productStyle["id"],
                          sizeId: productSizes[0]["id"]
                        }
                      ];
                    }
                  } else {
                    return [
                      2 /*return*/,
                      {
                        message: "Not in stock!",
                        found: false,
                        stock_level: false,
                        productId: id,
                        styleId: productStyle["id"],
                        sizeId: null
                      }
                    ];
                  }
                }
                for (
                  _a = 0, productSizes_1 = productSizes;
                  _a < productSizes_1.length;
                  _a++
                ) {
                  productSize = productSizes_1[_a];
                  stockProductSize = productSize["name"];
                  if (
                    stockProductSize.charAt(stockProductSize.length - 1) == " "
                  ) {
                    stockProductSize = stockProductSize.slice(0, -1);
                  }
                  if (stockProductSize == product.size) {
                    if (productSize["stock_level"] == 1) {
                      return [
                        2 /*return*/,
                        {
                          message: "In stock!",
                          found: true,
                          stock_level: true,
                          productId: id,
                          styleId: productStyle["id"],
                          sizeId: productSize["id"]
                        }
                      ];
                    }
                  }
                }
                if (product.sizeAlternative != "None") {
                  for (
                    _b = 0, productSizes_2 = productSizes;
                    _b < productSizes_2.length;
                    _b++
                  ) {
                    productSize = productSizes_2[_b];
                    stockProductSize = productSize["name"];
                    if (
                      stockProductSize.charAt(stockProductSize.length - 1) ==
                      " "
                    ) {
                      stockProductSize = stockProductSize.slice(0, -1);
                    }
                    if (stockProductSize == product.sizeAlternative) {
                      if (productSize["stock_level"] == 1) {
                        return [
                          2 /*return*/,
                          {
                            message: "In stock!",
                            found: true,
                            stock_level: true,
                            productId: id,
                            styleId: productStyle["id"],
                            sizeId: productSize["id"]
                          }
                        ];
                      } else {
                        return [
                          2 /*return*/,
                          {
                            message: "Not in stock!",
                            found: true,
                            stock_level: false,
                            productId: id,
                            styleId: productStyle["id"],
                            sizeId: productSize["id"]
                          }
                        ];
                      }
                    }
                  }
                }
                return [
                  2 /*return*/,
                  {
                    message: "Size not found or not in stock!",
                    found: false,
                    stock_level: null,
                    productId: id,
                    styleId: productStyle["id"],
                    sizeId: null
                  }
                ];
              }
            }
            return [
              2 /*return*/,
              {
                message: "Style not found!",
                found: false,
                stock_level: null,
                productId: id,
                styleId: null,
                sizeId: null
              }
            ];
        }
      });
    });
  };
  Supreme.prototype.getCart = function() {
    return __awaiter(this, void 0, void 0, function() {
      var cartApiUrl;
      return __generator(this, function(_a) {
        cartApiUrl = this.baseUrl + "/shop/cart.json";
        return [
          2 /*return*/,
          new Promise(function(resolve, reject) {
            request(cartApiUrl, function(err, res, body) {
              if (err) {
                reject(err);
              } else if (res && res.statusCode == 200) {
                var data = JSON.parse(body);
                resolve(data);
              }
            });
          })
        ];
      });
    });
  };
  Supreme.prototype.checkCart = function() {
    return __awaiter(this, void 0, void 0, function() {
      var cart;
      var _this = this;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.getCart()];
          case 1:
            cart = _a.sent();
            if (cart.length > 0) {
              return [2 /*return*/];
            } else {
              setTimeout(function() {
                return __awaiter(_this, void 0, void 0, function() {
                  return __generator(this, function(_a) {
                    this.checkCart();
                    return [2 /*return*/];
                  });
                });
              }, 100);
            }
            return [2 /*return*/];
        }
      });
    });
  };
  Supreme.prototype.addProductToCart = function(productState) {
    return __awaiter(this, void 0, void 0, function() {
      var productUrl;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            productUrl =
              this.baseUrl +
              "/mobile#products/" +
              productState.productId +
              "/" +
              productState.styleId;
            return [
              4 /*yield*/,
              this.page.goto(productUrl, { waitUntil: "networkidle2" })
            ];
          case 1:
            _a.sent();
            return [4 /*yield*/, this.page.waitForSelector("#size-options")];
          case 2:
            _a.sent();
            return [
              4 /*yield*/,
              this.page.evaluate(function(sizeId) {
                document.getElementById("size-options").value = sizeId;
                document.querySelector(".cart-button").click();
              }, productState.sizeId)
            ];
          case 3:
            _a.sent();
            return [4 /*yield*/, this.checkCart()];
          case 4:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  };
  Supreme.prototype.checkout = function(profile, settings, runtimeTimer) {
    return __awaiter(this, void 0, void 0, function() {
      var recaptchaResponseToken, err_1, totalString, total;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            // ERROR HAPPENING HERE
            return [
              4 /*yield*/,
              this.page.goto(this.baseUrl + "/mobile/#checkout", {
                waitUntil: "networkidle2"
              })
            ];
          case 1:
            // ERROR HAPPENING HERE
            _a.sent();
            _a.label = 2;
          case 2:
            _a.trys.push([2, 4, , 5]);
            return [4 /*yield*/, utility_1.Utility.getRecaptchaResponseToken()];
          case 3:
            recaptchaResponseToken = _a.sent();
            return [3 /*break*/, 5];
          case 4:
            err_1 = _a.sent();
            throw new Error(err_1);
          case 5:
            return [
              4 /*yield*/,
              this.page.waitForSelector("#mobile_checkout_form")
            ];
          case 6:
            _a.sent();
            return [
              4 /*yield*/,
              this.page.evaluate(
                function(profile, recaptchaResponseToken) {
                  document.getElementById("order_billing_name").value =
                    profile["name"];
                  document.getElementById("order_email").value =
                    profile["email"];
                  document.getElementById("order_tel").value = profile["tel"];
                  document.getElementById("order_billing_address").value =
                    profile["address"];
                  document.getElementById("order_billing_city").value =
                    profile["city"];
                  document.getElementById("order_billing_zip").value =
                    profile["zip"];
                  document.getElementById("order_billing_country").value =
                    profile["country"];
                  document.getElementById("credit_card_type").value = profile[
                    "type"
                  ].toLowerCase();
                  document.getElementById("credit_card_n").value =
                    profile["cardnumber"];
                  document.getElementById("credit_card_month").value =
                    profile["month"];
                  document.getElementById("credit_card_year").value =
                    profile["year"];
                  document.getElementById("credit_card_cvv").value =
                    profile["cvv"];
                  document.querySelector("input[name='order[terms]']").value =
                    "1";
                  document.getElementById("order_terms").value = "1";
                  document.getElementById(
                    "g-recaptcha-response"
                  ).value = recaptchaResponseToken;
                },
                JSON.parse(JSON.stringify(profile)),
                recaptchaResponseToken
              )
            ];
          case 7:
            _a.sent();
            return [
              4 /*yield*/,
              this.page.evaluate(function() {
                return Promise.resolve(
                  document.getElementById("total").innerHTML
                );
              })
            ];
          case 8:
            totalString = _a.sent();
            totalString = totalString.replace("€", "");
            total = parseInt(totalString);
            if (total > settings["priceLimit"]) {
              throw new Error(
                "Order total of " +
                  total +
                  "€ is higher than price limit of " +
                  settings["priceLimit"] +
                  "€"
              );
            }
            return [4 /*yield*/, this.delay(settings.delay, runtimeTimer)];
          case 9:
            _a.sent();
            if (!!settings["testMode"]) return [3 /*break*/, 11];
            return [4 /*yield*/, this.page.click("#submit_button")];
          case 10:
            _a.sent();
            _a.label = 11;
          case 11:
            return [2 /*return*/];
        }
      });
    });
  };
  Supreme.prototype.delay = function(delayTime, runtimeTimer) {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        return [
          2 /*return*/,
          new Promise(function(resolve, reject) {
            (function() {
              var _this = this;
              var runtimeDiff = runtimeTimer.getRuntimeMs();
              if (runtimeDiff > delayTime) {
                resolve();
              } else {
                setTimeout(function() {
                  _this.delay();
                }, 50);
              }
            })();
          })
        ];
      });
    });
  };
  return Supreme;
})(pup_browser_1.PupBrowser);
exports.Supreme = Supreme;
//# sourceMappingURL=supreme.js.map
