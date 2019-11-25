import * as puppeteer from "puppeteer-core";

import { Product } from "./models/product";
import { ProductState } from "./models/product_state";
import { Profile } from "./models/profile";
import { Settings } from "./models/settings";
import { Supreme } from "./supreme";
import { Utility } from "./utility";

const testProduct: Product = {
  category: "Sweatshirts",
  keywords: "Disturbed Zip Up Hooded Sweatshirt",
  style: "Light Violet",
  size: "Medium",
  styleAlternative: "Red",
  sizeAlternative: "Medium"
};

const testProfile: Profile = {
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

const testSettings: Settings = {
  testMode: true,
  dropTime: "12:00:00",
  delay: 3000,
  priceLimit: 0
};

async function cop(
  supreme: Supreme,
  runtimeTimer: Utility.RuntimeTimer,
  product: Product,
  profile: Profile,
  settings: Settings
) {
  try {
    let productToCop: object = await supreme.searchProductByKeywords(product);
    console.log(productToCop);
    let productState: ProductState = await supreme.getProductState(
      productToCop["id"],
      product
    );
    console.log(productState);
    if (
      !productState.found ||
      !productState.stock_level ||
      productState.stock_level == null
    ) {
      throw new Error(productState["message"]);
    }
    runtimeTimer.start();
    await supreme.addProductToCart(productState);
    try {
      await supreme.checkout(profile, settings, runtimeTimer);
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    setTimeout(() => {
      console.log(err);
      cop(supreme, runtimeTimer, product, profile, settings);
    }, 200);
  }
}

// (async () => {
//   const supreme = new Supreme();
//   let runtimeTimer = new Utility.RuntimeTimer();
//   await supreme.init();
//   await cop(supreme, runtimeTimer);
// })();

export namespace Bot {
  export async function start(
    pieBrowser: puppeteer.Browser,
    product: Product,
    profile: Profile,
    settings: Settings
  ): Promise<void> {
    console.log(product, profile, settings);
    const supreme = new Supreme(pieBrowser);
    let runtimeTimer = new Utility.RuntimeTimer();
    await supreme.init();
    await cop(supreme, runtimeTimer, product, profile, settings);
  }
}
