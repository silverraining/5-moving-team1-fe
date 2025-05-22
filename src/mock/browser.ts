import { setupWorker } from "msw/browser";
import { handlers } from "./hendler";

const isBrowser = typeof window !== "undefined";

export const worker = isBrowser ? setupWorker(...handlers) : null;
