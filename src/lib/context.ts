import { getBusinessDetails } from "./queries";
import type { BusinessDetails } from "./types";

let _bd: BusinessDetails | null = null;

export async function ensureBusinessDetails(): Promise<BusinessDetails> {
  if (!_bd) {
    _bd = await getBusinessDetails();
  }
  return _bd;
}
