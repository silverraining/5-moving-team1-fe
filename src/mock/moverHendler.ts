import { http, HttpResponse, passthrough } from "msw";
import { API_BASE_URL } from "../lib/constants";
import { ServiceType } from "../types/common";
import { EstimateRequest, Review } from "../types/estimate";
import { ESTIMATEREQUEST } from "../lib/mockData";
import { CustomerProfile } from "../types/auth";

export const generateMockReviews = (
  count: number,
  customerProfile: CustomerProfile
): Review[] => {
  const reviews: Review[] = [];

  for (let i = 0; i < count; i++) {
    const idSuffix = (i + 1).toString().padStart(3, "0");
    reviews.push({
      estimateOfferId: `offer-${idSuffix}`,
      customerId: customerProfile.userId,
      moverId: `mover-${idSuffix}`,
      rating: (i % 5) + 1, // 1~5 반복
      comment: `이사 서비스에 대한 리뷰 ${i + 1}`,
      createdAt: new Date(
        `2024-05-${String(i + 1).padStart(2, "0")}T10:00:00Z`
      ),
      updatedAt: new Date("2024-05-26T12:00:00Z"),
      estimateOffer: undefined,
      customerProfile,
    });
  }

  return reviews;
};

const generateEstimateRequests = (
  count: number,
  serviceTypes: ServiceType[],
  filter: string
): EstimateRequest[] => {
  return Array.from({ length: count }, (_, i) => {
    const base = structuredClone(ESTIMATEREQUEST); // deep copy
    const type = serviceTypes[i % serviceTypes.length];

    return {
      ...base,
      id: `estimate-${String(i + 1).padStart(3, "0")}`,
      moveType: type,
      title: `이사 요청 ${i + 1} - ${filter}`,
      fromAddress: {
        ...base.fromAddress,
      },
    };
  });
};

export const moverHandlers = [
  http.get(`${API_BASE_URL}/mover/estimate/request`, async ({ request }) => {
    const url = new URL(request.url);

    const serviceTypeParams = url.searchParams
      .getAll("serviceType")
      .map((type) => type as unknown as ServiceType);
    const filter = url.searchParams.get("filter") || "";

    console.log("MOCK ESTIMATE REQUEST 요청 도착", {
      serviceTypeParams,
      filter,
    });

    const filtered = generateEstimateRequests(10, serviceTypeParams, filter);

    return HttpResponse.json({ data: filtered });
  }),
  http.post("http://localhost:5000/real-route", passthrough),
];
