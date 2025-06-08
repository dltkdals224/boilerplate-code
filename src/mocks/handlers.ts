import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/auth/verify-nickname", ({ request }) => {
    const url = new URL(request.url);
    const nickname = url.searchParams.get("nickname");

    if (nickname === "test") {
      return HttpResponse.json({ success: false });
    }
    return HttpResponse.json({ success: true });
  }),
];
