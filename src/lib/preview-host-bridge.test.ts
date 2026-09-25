import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  PREVIEW_BRIDGE_CHANNEL,
  PREVIEW_BRIDGE_VERSION,
  isSafeBridgePath,
  installPreviewHostBridge,
  collectRoutePathsFromTree,
  isGrokEmbedderOrigin,
  resolveParentEmbedderOrigin,
} from "./preview-host-bridge.ts";

describe("preview host bridge constants", () => {
  it("exposes channel and version", () => {
    assert.equal(PREVIEW_BRIDGE_CHANNEL, "grok-preview-bridge");
    assert.equal(PREVIEW_BRIDGE_VERSION, 1);
  });
});

describe("isSafeBridgePath", () => {
  it("accepts same-origin absolute paths", () => {
    assert.equal(isSafeBridgePath("/"), true);
    assert.equal(isSafeBridgePath("/hosts"), true);
    assert.equal(isSafeBridgePath("/desk?x=1"), true);
    assert.equal(isSafeBridgePath("/a#b"), true);
  });

  it("rejects open redirects and relative paths", () => {
    assert.equal(isSafeBridgePath("//evil.example"), false);
    assert.equal(isSafeBridgePath("\\\\evil"), false);
    assert.equal(isSafeBridgePath("hosts"), false);
    assert.equal(isSafeBridgePath("http://evil.example/"), false);
    assert.equal(isSafeBridgePath(""), false);
  });
});

describe("installPreviewHostBridge", () => {
  it("noops when window is undefined (Node)", () => {
    assert.equal(typeof window, "undefined");
    const dispose = installPreviewHostBridge();
    assert.equal(typeof dispose, "function");
    dispose();
  });
});

describe("collectRoutePathsFromTree", () => {
  it("walks fullPath / path / children", () => {
    const paths = collectRoutePathsFromTree({
      fullPath: "",
      children: [
        { fullPath: "/hosts" },
        { path: "desk", children: { nested: { fullPath: "/desk/nested" } } },
      ],
    });
    assert.deepEqual(paths.sort(), ["/", "/desk", "/desk/nested", "/hosts"].sort());
  });
});

describe("embedder origin helpers (re-exported)", () => {
  it("allowlists grok + localhost", () => {
    assert.equal(isGrokEmbedderOrigin("https://grok.com"), true);
    assert.equal(isGrokEmbedderOrigin("https://x.grok.com"), true);
    assert.equal(isGrokEmbedderOrigin("http://localhost:5173"), true);
    assert.equal(isGrokEmbedderOrigin("https://evil.com"), false);
  });

  it("returns null when parent is self", () => {
    assert.equal(
      resolveParentEmbedderOrigin(true, "https://grok.com/", null, "app.example"),
      null,
    );
  });

  it("resolves grok parent from referrer when framed", () => {
    assert.equal(
      resolveParentEmbedderOrigin(
        false,
        "https://grok.com/chat",
        null,
        "guest.example",
      ),
      "https://grok.com",
    );
  });
});