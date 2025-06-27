import { ProfileEdit } from "@/src/components/profile/customer/ProfileEdit";

// 테스트용 초기 데이터 (실제로는 API에서 가져올 데이터)
const mockInitialData = {
  name: "김코드",
  email: "codeit@email.com",
  phone: "01012345678",
  serviceType: ["small"],
  serviceRegion: ["서울"],
  imageUrl: "/Images/profile/binProfile.svg",
};

export default function ProfileEditPage() {
  return <ProfileEdit initialData={mockInitialData} />;
}
