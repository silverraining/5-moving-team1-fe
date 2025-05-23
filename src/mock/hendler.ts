import { http, HttpResponse } from "msw";

export const handlers = [
  http.post(
    "https://api.example.com/auth/login/:userType",
    async ({ params, request }) => {
      const body = await request.json();
      console.log("MOCK LOGIN 요청 도착", params.userType, body);
      return HttpResponse.json({
        token: "mock-token",
        user: { email: "body.email" },
      });
    }
  ),
];
