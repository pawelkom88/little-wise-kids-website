import assert from "node:assert/strict";
import test from "node:test";
import { safeExternalUrl } from "./urls.mjs";

test("allows only absolute HTTPS URLs", () => {
  assert.equal(safeExternalUrl("https://example.com/a"), "https://example.com/a");
  assert.equal(safeExternalUrl("http://example.com"), null);
  assert.equal(safeExternalUrl("javascript:alert(1)"), null);
  assert.equal(safeExternalUrl("data:text/html,test"), null);
  assert.equal(safeExternalUrl("/relative"), null);
  assert.equal(safeExternalUrl("not a url"), null);
});
