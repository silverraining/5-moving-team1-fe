export type ServiceType = "SMALL" | "HOME" | "OFFICE";

enum ServiceRegion {
  SEOUL = "Seoul",
  GYEONGGI = "Gyeonggi-do",
  INCHEON = "Incheon",
  GANGWON = "Gangwon-do",
  CHUNGBUK = "Chungcheongbuk-do",
  CHUNGNAM = "Chungcheongnam-do",
  SEJONG = "Sejong-si",
  DAEJEON = "Daejeon",
  JEONBUK = "Jeonbuk-do",
  JEONNAM = "Jeollanam-do",
  GWANGJU = "Gwangju",
  GYEONGBUK = "Gyeongsangbuk-do",
  GYEONGNAM = "Gyeongsangnam-do",
  DAEGU = "Daegu",
  ULSAN = "Ulsan",
  BUSAN = "Busan",
  JEJU = "Jeju-do",
}

export type Notification = {
  id: String;
  userId: String;
  type: NotificationType;
  message: String;
  targetId: String;
  isRead: Boolean;
  createdAt: Date;
};

enum EstimateOfferStatus {
  REQUESTED, // 고객이 견적 요청 보냄 (기사 입장에선 대기 중)
  SUBMITTED, // 기사님이 견적서 보냄
  REJECTED, // 기사님이 반려함
  CONFIRMED, // 고객이 확정함
  CANCELED, // 고객이 다른 기사 선택 → 자동 취소
  COMPLETED, // 이사 완료
}

enum EstimateRequestStatus {
  PENDING, // 견적 제안 대기 중
  CONFIRMED, // 고객이 기사님 1명 확정
  COMPLETED, // 이사 완료
  CANCELED, // 고객이 요청 취소
  EXPIRED, // 이사일 지나도록 확정 없음
}

enum NotificationType {
  NEW_ESTIMATE_REQUEST,
  ESTIMATE_CONFIRMED,
  MOVE_DAY_REMINDER,
}

export interface ReviewData {
  id: number;
  author: string;
  date: string;
  rating: number;
  content: string;
}

export interface ReviewStatistics {
  average: number;
  score: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  max: number;
}

export {
  EstimateOfferStatus,
  EstimateRequestStatus,
  NotificationType,
  ServiceRegion,
};
