import { http, HttpResponse, passthrough } from "msw";
import { LOGIN } from "../lib/mockData";
import { API_BASE_URL } from "../lib/constants";

export const authHandlers = [
  http.post(`${API_BASE_URL}/auth/login/local`, async ({ request }) => {
    const body = await request.json();
    console.log("MOCK LOGIN 요청 도착", body);

    return HttpResponse.json(LOGIN);
  }),
  http.post(`${API_BASE_URL}/auth/register`, async ({ request }) => {
    const body = await request.json();
    console.log("MOCK REGISTER 요청 도착", body);

    return HttpResponse.json("회원가입 성공", {
      status: 201,
    });
  }),
  http.post("http://localhost:5000/real-route", passthrough),
];
