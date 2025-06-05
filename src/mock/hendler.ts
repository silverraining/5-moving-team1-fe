import { http, HttpResponse, passthrough } from "msw";
import { API_BASE_URL } from "../lib/constants";
import { generateMoverList } from "../utils/utill";
import { MOVER_DTAIL } from "../lib/mockData";
import { ServiceRegion, ServiceType } from "../types/common";

export const handlers = [
  http.get(
    `${API_BASE_URL}/user/mover/list`,
    async (req: { request: Request }) => {
      const { request } = req;
      const url = new URL(request.url);
      const location = url.searchParams.get("location") as ServiceRegion | null;
      const serviceType = url.searchParams.get(
        "serviceType"
      ) as ServiceType | null;
      const sortBy = url.searchParams.get("sortBy");
      console.log("MOCK MOVER LIST 요청 도착", {
        location,
        serviceType,
        sortBy,
      });
      const movers = generateMoverList(30);
      return HttpResponse.json(movers);
    }
  ),

  http.get(
    `${API_BASE_URL}/user/mover/detail/:moverId`,
    async ({ params }: { params: { moverId: string } }) => {
      const { moverId } = params;
      const movers = generateMoverList(30);
      const mover = movers.find((m) => m.id === moverId) ?? MOVER_DTAIL;
      console.log("MOCK MOVER DETAIL 요청 도착", moverId);
      return HttpResponse.json(mover);
    }
  ),

  http.post("http://localhost:5000/real-route", passthrough),
];
