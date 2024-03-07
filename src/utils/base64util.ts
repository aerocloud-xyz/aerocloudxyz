import { Buffer } from "buffer";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const encodeFromBase64 = (str: string): string =>
  Buffer.from(str, "binary").toString("base64");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const decodeFromBase64 = (str: string): string =>
  Buffer.from(str, "base64").toString("binary");
