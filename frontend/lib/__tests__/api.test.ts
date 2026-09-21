import { afterEach, describe, expect, it, vi } from "vitest";

import { ApiError, listReviews } from "@/lib/api";

describe("api client", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("normalizes malformed successful JSON responses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("not json", { status: 200 }))
    );

    await expect(listReviews()).rejects.toMatchObject<Partial<ApiError>>({
      message: "The backend returned an invalid response. Try again in a moment.",
      name: "ApiError",
      status: 200
    });
  });
});
