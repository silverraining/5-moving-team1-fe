export const LOGIN = {
  accessToken: "mockAccessToken12345",
  refreshToken: "mockRefreshToken67890",
  user: {
    id: "user-001",
    name: "홍길동",
    phone: "010-1234-5678",
    email: "hong@example.com",
    role: "CUSTOMER",
    createdAt: new Date("2024-01-01T10:00:00Z"),
    updatedAt: new Date("2024-05-26T12:00:00Z"),
    notifications: [
      { id: "noti1", message: "새 알림이 도착했습니다.", read: false },
    ],
    customerProfile: [{ id: "profile1", info: "프로필 정보 예시" }],
    moverProfile: [],
  },
};
