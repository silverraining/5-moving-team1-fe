import { GeneralEdit } from "@/src/components/profile/mover/GeneralEdit";

// 테스트용 초기 데이터 (실제로는 API에서 가져올 데이터)
const mockInitialData = {
  name: "김코드",
  email: "codeit@email.com",
  phone: "01012345678",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function MoverEditPage() {
  return <GeneralEdit initialData={mockInitialData} />;
}
