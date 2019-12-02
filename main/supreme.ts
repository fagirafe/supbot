import { PupBrowser } from "./pup_browser";
import { Product } from "./models/product";
import * as request from "request";
import { ProductState } from "./models/product_state";
import { Profile } from "./models/profile";
import { Settings } from "./models/settings";
import { Utils } from "./utils";
import * as puppeteer from "puppeteer-core";
import { CaptchaHarvester } from "./captcha_harvester";
import { ProcessLogger } from "./process_logger";

export class Supreme extends PupBrowser {
  constructor(pieBrowser: puppeteer.Browser) {
    super(pieBrowser);
  }

  public async getMobileStock(): Promise<object> {
    let url: string = await this.page.url();
    if (url.includes(this.baseUrl)) {
      return await this.page.evaluate(() => {
        return new Promise<object>((resolve, reject) => {
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
      });
    } else {
      return Promise.reject();
    }
  }

  public async searchProductByKeywords(
    productToSearch: Product
  ): Promise<object> {
    let stock: object;
    try {
      stock = await this.getMobileStock();
    } catch (error) {
      return Promise.reject(
        new Utils.CopError("Could not get stock: " + error)
      );
    }
    let categories: object = stock["products_and_categories"];
    for (let categoryKey in categories) {
      if (categoryKey == productToSearch.category) {
        for (let product of categories[categoryKey]) {
          let stockProductName: string = product["name"];
          stockProductName = stockProductName.toLowerCase();
          if (stockProductName.charAt(stockProductName.length - 1) == " ") {
            stockProductName = stockProductName.slice(0, -1);
          }
          if (
            stockProductName.includes(productToSearch.keywords.toLowerCase())
          ) {
            return Promise.resolve(product);
          }
        }
      }
    }
    return Promise.reject(
      new Utils.CopError("Could not find product by keywords!")
    );
  }

  public async getProduct(id: string): Promise<any> {
    let url: string = await this.page.url();
    if (url.includes(this.baseUrl)) {
      return await this.page.evaluate(id => {
        return new Promise((resolve, reject) => {
          var xmlhttp = new XMLHttpRequest();
          var url = "https://www.supremenewyork.com/shop/" + id + ".json";

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
      }, id);
    }
  }

  public async getProductState(
    id: string,
    product: Product
  ): Promise<ProductState> {
    let productDetails = await this.getProduct(id);
    let productStyles = productDetails["styles"];
    for (let productStyle of productStyles) {
      let stockProductStyle: string = productStyle["name"];
      stockProductStyle = stockProductStyle.toLowerCase();
      if (stockProductStyle.includes(product.style.toLowerCase())) {
        let productSizes = productStyle["sizes"];
        if (product.size == "None") {
          if (productSizes[0]["name"] == "N/A") {
            if (productSizes[0]["stock_level"] == 1) {
              return {
                message: "In stock!",
                found: true,
                stock_level: true,
                productId: id,
                styleId: productStyle["id"],
                sizeId: productSizes[0]["id"]
              };
            } else {
              return {
                message: "Not in stock!",
                found: true,
                stock_level: false,
                productId: id,
                styleId: productStyle["id"],
                sizeId: productSizes[0]["id"]
              };
            }
          } else {
            return {
              message: "Not in stock!",
              found: false,
              stock_level: false,
              productId: id,
              styleId: productStyle["id"],
              sizeId: null
            };
          }
        }
        for (let productSize of productSizes) {
          let stockProductSize = productSize["name"];
          if (stockProductSize.charAt(stockProductSize.length - 1) == " ") {
            stockProductSize = stockProductSize.slice(0, -1);
          }
          if (stockProductSize == product.size) {
            if (productSize["stock_level"] == 1) {
              return {
                message: "In stock!",
                found: true,
                stock_level: true,
                productId: id,
                styleId: productStyle["id"],
                sizeId: productSize["id"]
              };
            }
          }
        }
        if (product.sizeAlternative != "None") {
          for (let productSize of productSizes) {
            let stockProductSize = productSize["name"];
            if (stockProductSize.charAt(stockProductSize.length - 1) == " ") {
              stockProductSize = stockProductSize.slice(0, -1);
            }
            if (stockProductSize == product.sizeAlternative) {
              if (productSize["stock_level"] == 1) {
                return {
                  message: "In stock!",
                  found: true,
                  stock_level: true,
                  productId: id,
                  styleId: productStyle["id"],
                  sizeId: productSize["id"]
                };
              } else {
                return {
                  message: "Not in stock!",
                  found: true,
                  stock_level: false,
                  productId: id,
                  styleId: productStyle["id"],
                  sizeId: productSize["id"]
                };
              }
            }
          }
        }
        return {
          message: "Size not found or not in stock!",
          found: false,
          stock_level: null,
          productId: id,
          styleId: productStyle["id"],
          sizeId: null
        };
      }
    }
    return {
      message: "Style not found!",
      found: false,
      stock_level: null,
      productId: id,
      styleId: null,
      sizeId: null
    };
  }

  public async getCart(): Promise<any> {
    let cartApiUrl = this.baseUrl + "/shop/cart.json";
    return new Promise((resolve, reject) => {
      request(cartApiUrl, (err, res, body) => {
        if (err) {
          reject(err);
        } else if (res && res.statusCode == 200) {
          let data = JSON.parse(body);
          resolve(data);
        }
      });
    });
  }

  public async checkCart(): Promise<void> {
    let cart = await this.getCart();
    if (cart.length > 0) {
      return;
    } else {
      setTimeout(async () => {
        this.checkCart();
      }, 100);
    }
  }

  public async addProductToCart(productState: ProductState): Promise<void> {
    let productUrl =
      this.baseUrl +
      "/mobile#products/" +
      productState.productId +
      "/" +
      productState.styleId;
    await this.page.goto(productUrl, { waitUntil: "networkidle2" });
    await this.page.waitForSelector("#size-options");
    await this.page.evaluate(sizeId => {
      (<HTMLSelectElement>(
        document.getElementById("size-options")
      )).value = sizeId;
      (<HTMLElement>document.querySelector(".cart-button")).click();
    }, productState.sizeId);
    await this.checkCart();
  }

  public async checkout(
    profile: Profile,
    settings: Settings,
    runtimeTimer: Utils.RuntimeTimer
  ): Promise<void> {
    let tokenBank = CaptchaHarvester.tokenBank;
    let recaptchaResponseToken;
    await this.page.goto(this.baseUrl + "/mobile/#checkout", {
      waitUntil: "networkidle2"
    });
    if (!settings.testMode) {
      if (tokenBank.length) {
        recaptchaResponseToken = tokenBank[tokenBank.length - 1]["token"];
        ProcessLogger.log(
          ProcessLogger.LogType.Info,
          "Token: " + recaptchaResponseToken
        );
      } else {
        return Promise.reject(
          "No ReCAPTCHA token found! Did you fill out recaptchas? Keep in mind: ReCAPTCHA Tokens expire after around 1.5 minutes!"
        );
      }
    }
    await this.page.waitForSelector("#mobile_checkout_form");
    await this.page.evaluate(
      (profile, recaptchaResponseToken) => {
        (<HTMLInputElement>(
          document.getElementById("order_billing_name")
        )).value = profile["fullName"];
        (<HTMLInputElement>document.getElementById("order_email")).value =
          profile["email"];
        (<HTMLInputElement>document.getElementById("order_tel")).value =
          profile["tel"];
        (<HTMLInputElement>(
          document.getElementById("order_billing_address")
        )).value = profile["address"];
        (<HTMLInputElement>(
          document.getElementById("order_billing_city")
        )).value = profile["city"];
        (<HTMLInputElement>document.getElementById("order_billing_zip")).value =
          profile["zip"];
        (<HTMLInputElement>(
          document.getElementById("order_billing_country")
        )).value = profile["country"];
        (<HTMLInputElement>(
          document.getElementById("credit_card_type")
        )).value = profile["type"].toLowerCase();
        (<HTMLInputElement>document.getElementById("credit_card_n")).value =
          profile["cardNumber"];
        (<HTMLInputElement>document.getElementById("credit_card_month")).value =
          profile["expMonth"];
        (<HTMLInputElement>document.getElementById("credit_card_year")).value =
          profile["expYear"];
        (<HTMLInputElement>document.getElementById("credit_card_cvv")).value =
          profile["CVV"];
        (<HTMLInputElement>(
          document.querySelector("input[name='order[terms]']")
        )).value = "1";
        (<HTMLInputElement>document.getElementById("order_terms")).value = "1";
        (<HTMLInputElement>(
          document.getElementById("g-recaptcha-response")
        )).value = recaptchaResponseToken;
      },
      JSON.parse(JSON.stringify(profile)),
      recaptchaResponseToken
    );
    if (settings.priceLimit != 0) {
      let totalString = await this.page.evaluate(() => {
        return Promise.resolve(document.getElementById("total").innerHTML);
      });
      totalString = totalString.replace("€", "");
      let total = parseInt(totalString);
      if (total > settings["priceLimit"]) {
        Promise.reject(
          "Order total of " +
            total +
            "€ is higher than price limit of " +
            settings["priceLimit"] +
            "€"
        );
      }
    }
    await this.delay(settings.delay, runtimeTimer);
    if (!settings.testMode) {
      await this.page.click("#submit_button");
    }
  }

  public async delay(
    delayTime: number,
    runtimeTimer: Utils.RuntimeTimer
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      (function delay() {
        let runtimeDiff = runtimeTimer.getRuntimeMs();
        if (runtimeDiff > delayTime) {
          resolve();
        } else {
          setTimeout(() => {
            delay();
          }, 50);
        }
      })();
    });
  }
}
