import * as puppeteer from "puppeteer-core";

import { CaptchaHarvester } from "./captcha_harvester";
import { ProcessLogger } from "./process_logger";
import { Product } from "./models/product";
import { ProductState } from "./models/product_state";
import { Profile } from "./models/profile";
import { Settings } from "./models/settings";
import { Supreme } from "./supreme";
import { Utils } from "./utils";

async function cop(
  supreme: Supreme,
  runtimeTimer: Utils.RuntimeTimer,
  product: Product,
  profile: Profile,
  settings: Settings
): Promise<void> {
  try {
    let productToCop: object = await supreme.searchProductByKeywords(product);
    console.log(productToCop);
    ProcessLogger.log(
      ProcessLogger.LogType.State,
      "Product to cop: " + JSON.stringify(productToCop)
    );
    let productState: ProductState = await supreme.getProductState(
      productToCop["id"],
      product
    );
    console.log(productState);
    ProcessLogger.log(
      ProcessLogger.LogType.State,
      "State of product: " + JSON.stringify(productState)
    );
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
    if (err instanceof Utils.CopError) {
      setTimeout(() => {
        ProcessLogger.log(ProcessLogger.LogType.Info, err);
        cop(supreme, runtimeTimer, product, profile, settings);
      }, 200);
    }
    console.log(err);
  }
  try {
    await supreme.checkout(profile, settings, runtimeTimer);
  } catch (err) {
    return Promise.reject(err);
  }
}

export namespace Bot {
  let supreme: Supreme;
  let captchaHarvester: CaptchaHarvester;
  let runtimeTimer: Utils.RuntimeTimer = new Utils.RuntimeTimer();

  export async function init(pieBrowser: puppeteer.Browser): Promise<void> {
    supreme = new Supreme(pieBrowser);
    captchaHarvester = new CaptchaHarvester(pieBrowser);
    await supreme.init();
    await captchaHarvester.init();
    await captchaHarvester.harvest();
  }

  export async function start(
    product: Product,
    profile: Profile,
    settings: Settings
  ): Promise<void> {
    console.log(product, profile, settings);
    try {
      ProcessLogger.log(ProcessLogger.LogType.State, "Starting to cop...");
      await cop(supreme, runtimeTimer, product, profile, settings);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  export async function closeWindows() {
    if (supreme) {
      await supreme.close();
    }
    if (captchaHarvester) {
      await captchaHarvester.close();
    }
  }
}
