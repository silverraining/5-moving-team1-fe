import { setupWorker } from "msw/browser";
import { authHandlers } from "./authHendler";
import { handlers } from "./hendler";
import { moverHandlers } from "./moverHendler";

const isBrowser = typeof window !== "undefined";

export const worker = isBrowser
  ? setupWorker(...authHandlers, ...handlers, ...moverHandlers)
  : null;
