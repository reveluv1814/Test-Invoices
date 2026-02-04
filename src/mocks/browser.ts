import { setupWorker } from "msw/browser";
import { handlersEndPoint } from "./handlers";

export const worker = setupWorker(...handlersEndPoint);
