import * as objects from "./objects";
import * as singletons from "./singletons";
import * as collections from "./collections";

export const schemaTypes = [
  ...Object.values(objects),
  ...Object.values(singletons),
  ...Object.values(collections),
];
