import { afterEach, describe, expect, it, vi } from "vitest";

import { ApiError, listReviews } from "@/lib/api";

describe("api client", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.NEXT_PUBLIC_API_BASE_URL;
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

  it("preserves custom request headers", async () => {
    const fetchMock = vi.fn(async (...args: Parameters<typeof fetch>) => {
      void args;
      return Response.json({ items: [], limit: 20, offset: 0, count: 0 });
    });
    vi.stubGlobal("fetch", fetchMock);

    await listReviews();

    const headers = fetchMock.mock.calls[0]?.[1]?.headers;
    expect(headers).toBeInstanceOf(Headers);
    expect((headers as Headers).get("Content-Type")).toBe("application/json");
  });

  it("removes repeated trailing slashes from the API base URL", async () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = "http://localhost:8000/api//";
    const fetchMock = vi.fn(async (...args: Parameters<typeof fetch>) => {
      void args;
      return Response.json({ items: [], limit: 20, offset: 0, count: 0 });
    });
    vi.stubGlobal("fetch", fetchMock);

    await listReviews();

    expect(fetchMock.mock.calls[0]?.[0]).toBe("http://localhost:8000/api/reviews?limit=20&offset=0");
  });
});
