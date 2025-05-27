import { setupWorker } from "msw/browser";
import { Authhandlers } from "./authHendler";
import { handlers } from "./hendler";

const isBrowser = typeof window !== "undefined";

export const worker = isBrowser
  ? setupWorker(...Authhandlers, ...handlers)
  : null;
