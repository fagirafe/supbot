import * as puppeteer from "puppeteer-core";

import { Product } from "./models/product";
import { ProductState } from "./models/product_state";
import { Profile } from "./models/profile";
import { Settings } from "./models/settings";
import { Supreme } from "./supreme";
import { Utility } from "./utility";
import { async } from "@angular/core/testing";

async function cop(
  supreme: Supreme,
  runtimeTimer: Utility.RuntimeTimer,
  product: Product,
  profile: Profile,
  settings: Settings
): Promise<void> {
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
  } catch (err) {
    setTimeout(() => {
      console.log(err);
      cop(supreme, runtimeTimer, product, profile, settings);
    }, 200);
  }
  try {
    await supreme.checkout(profile, settings, runtimeTimer);
  } catch (err) {
    return Promise.reject(err);
  }
}

export namespace Bot {
  let supreme: Supreme;
  let runtimeTimer: Utility.RuntimeTimer = new Utility.RuntimeTimer();

  export async function init(pieBrowser: puppeteer.Browser): Promise<void> {
    supreme = new Supreme(pieBrowser);
    await supreme.init();
    // Initialize CaptchaHarvester
  }

  export async function start(
    product: Product,
    profile: Profile,
    settings: Settings
  ): Promise<void> {
    console.log(product, profile, settings);
    try {
      await cop(supreme, runtimeTimer, product, profile, settings);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  export async function closeWindows() {
    if (supreme) {
      supreme.close();
    }
  }
}
