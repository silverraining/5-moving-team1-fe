import { PATH } from "./constants";

export const MOVER_INFO = {
  description: "일반 유저라면?",
  link: {
    content: "일반 유저 전용 페이지",
    href: PATH.userLogin,
  },
};
export const MOVER_SIGNUP_LINK = {
  description: "아직 무빙 회원이 아니신가요?",
  link: {
    content: "이메일로 회원가입하기",
    href: PATH.moverSignup,
  },
};

export const MOVER_LOGIN_LINK = {
  description: "이미 무빙 회원이신가요?",
  link: {
    content: "로그인",
    href: PATH.moverLogin,
  },
};

export const USER_INFO = {
  description: "기사님이신가요?",
  link: {
    content: "기사님 전용 페이지",
    href: PATH.moverLogin,
  },
};
export const USER_SIGNUP_LINK = {
  description: "아직 무빙 회원이 아니신가요?",
  link: {
    content: "이메일로 회원가입하기",
    href: PATH.userSignup,
  },
};
export const USER_LOGIN_LINK = {
  description: "이미 무빙 회원이신가요?",
  link: {
    content: "로그인",
    href: PATH.userLogin,
  },
};

export const LOGIN_FIELD = [
  {
    name: "email",
    label: "이메일",
    type: "email",
    placeholder: "이메일을 입력해주세요",
  },
  {
    name: "password",
    label: "비밀번호",
    type: "password",
    placeholder: "비밀번호를 입력해 주세요",
  },
] as const;

export const SIGNUP_FIELD = [
  {
    name: "name",
    label: "이름",
    type: "text",
    placeholder: "성함을 입력해 주세요",
  },
  {
    name: "email",
    label: "이메일",
    type: "email",
    placeholder: "이메일을 입력해주세요",
  },
  {
    name: "phone",
    label: "전화번호",
    type: "tel",
    placeholder: "숫자만 입력해 주세요",
  },
  {
    name: "password",
    label: "비밀번호",
    type: "password",
    placeholder: "비밀번호를 입력해 주세요",
  },
  {
    name: "passwordConfirm",
    label: "비밀번호 확인",
    type: "password",
    placeholder: "비밀번호를 다시 한번 입력해 주세요",
  },
] as const;
