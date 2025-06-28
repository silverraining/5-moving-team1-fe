import { ProfileEdit } from "@/src/components/profile/mover/ProfileEdit";

export default function MoverProfileEditPage() {
  //TODO: TEST용, API 연결 후 삭제
  const initialData = {
    name: "",
    email: "hong@gmail.com",
    phone: "010-1234-5678",
    nickname: "김코드",
    experience: "8",
    intro: "꼼꼼한 이사를 도와드립니다.",
    description:
      "안녕하세요. 이사업계 경력 7년으로 안전한 이사를 도와드리는 김코드입니다. 고객님의 물품을 소중하고 안전하게 운송하여 드립니다. 소형이사 및 가정이사 서비스를 제공하며 서비스 가능 지역은 서울과 경기권입니다. 그 외 기타 지역은 서비스 불가능합니다.",
    serviceType: ["small", "home"],
    serviceRegion: ["서울", "경기"],
  };

  return <ProfileEdit initialData={initialData} />;
}
