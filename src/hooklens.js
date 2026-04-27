import { getConfig } from "./config.js";
import createCapture from "./middleware.js";

export default function hooklens(options = {}) {
  const config = getConfig(options);

  return {
    capture() {
      return createCapture(config);
    }
  };
}